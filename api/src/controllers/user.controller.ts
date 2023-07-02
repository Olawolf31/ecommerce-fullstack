import { Request, Response, NextFunction } from 'express'
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from '../helpers/apiError'
import { apiSuccess } from '../helpers/apiSuccess'
import {
  registerUserService,
  activateUserService,
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
  editUserProfileService,
  deleteUserAccountService,
} from '../services/user.service'
import { User, UserDocument } from '../models/User'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../util/secrets'
import { hashPassword, comparePassword } from '../util/bcrypt'
import { sendEmailWithNodeMailer } from '../util/mailer'
import { CLIENT_URL } from '../util/secrets'

//POST /api/users/register
export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if user already exists
    const userExist = await User.findOne({ email: req.body.email })

    //if user already exists
    if (userExist) {
      throw new ForbiddenError('Email already exists', 400)
    }

    // hash the password
    const hashedPassword = await hashPassword(req.body.password)

    // get the avatar
    const avatar = req.file

    // generate token
    const token = jwt.sign(
      { ...req.body, password: hashedPassword, avatar: avatar?.filename },
      JWT_SECRET,
      { expiresIn: '5m' }
    )

    // prepare the email data
    const emailData = {
      email: req.body.email,
      subject: 'Account Activation Email',
      html: `
          <h2>Hello ${req.body.fullname}</h2>
          <p>Please click here to <a href="${CLIENT_URL}/activate/${token}" target="_blank">Activate your account</a> </p>
          `, //html body
    }

    // send verification email to the user
    sendEmailWithNodeMailer(emailData)

    const registerUser = await registerUserService(token)

    return apiSuccess(
      res,
      201,
      'user has been registered successfully, please check your email for activation link',
      registerUser
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//POST /api/users/activate
export const ActivateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === 'string') {
      throw new NotFoundError('Invalid Token', 400)
    }

    //check if email has been verified
    const emailVerified = await User.findOne({ email: decoded.email })

    //if email has already been verified
    if (emailVerified) {
      throw new ForbiddenError('Email has already been activated', 400)
    }

    //get user data from token
    const { fullname, email, password, avatar } = decoded

    // activate user
    const newUser = new User({
      fullname,
      email,
      password,
      avatar,
    })

    //if new user is not saved to the database succesfully, throw error
    if (!newUser) {
      throw new UnauthorizedError('Something went wrong', 400)
    }

    await activateUserService(newUser)

    return apiSuccess(res, 200, 'User has been activated successfully', newUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//POST /api/users/login
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await loginUserService(req.body.email)

    if (!user) {
      throw new UnauthorizedError('Invalid Credentials', 400)
    }

    // check if password matches
    const isMatch = await comparePassword(req.body.password, user.password)

    // if password doesn't match
    if (!isMatch) {
      throw new UnauthorizedError('Invalid Login', 400)
    }

    // check if user is banned
    if (user.isBanned) {
      throw new UnauthorizedError('User is banned', 400)
    }

    // generate access token
    const accessToken = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '60m',
    })

    /*  console.log(accessToken); */
    //create refresh token
    const refreshToken = jwt.sign({ _id: user._id }, JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    })

    //send refresh token as a cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      /*   path: "/api/refresh-token", */
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    })

    // return user and token to client, exclude hashed password
    return apiSuccess(res, 200, 'User logged in successfully', {
      accessToken,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//POST /api/users/logout
export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('jwt', { httpOnly: true })
    return apiSuccess(res, 200, 'User logged out successfully', {})
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//POST /api/users/refresh-token
export const RefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get refresh token from cookie
  const token = req.cookies.jwt

  if (!token) {
    throw new NotFoundError('Invalid Token', 400)
  }

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET)

    if (typeof decoded === 'string') {
      throw new ForbiddenError('Invalid Token', 400)
    }

    //generate new access token
    const accessToken = jwt.sign({ _id: decoded._id }, JWT_SECRET, {
      expiresIn: '2m',
    })

    //return new access token
    return apiSuccess(res, 200, 'Token refreshed successfully', {
      accessToken,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//GET /api/users/profile
export const UserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userProfile = req.user

    return apiSuccess(
      res,
      200,
      'User profile retrieved successfully',
      userProfile
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//PUT /api/users/forgot-password
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  try {
    const user = await forgotPasswordService(email)

    if (!user) {
      throw new UnauthorizedError('Invalid Credentials', 400)
    }

    //hash new password
    const hashedPassword = await hashPassword(password)

    // generate access token
    const token = jwt.sign({ email, hashedPassword }, JWT_SECRET, {
      expiresIn: '2m',
    })

    //send email to user with link to reset password

    // prepare the email data
    const emailData = {
      email: email,
      subject: 'Reset Password Link',
      html: `
          <h2>Hello ${user.fullname}</h2>
          <p>Please click here to <a href="${CLIENT_URL}/reset-password/${token}" target="_blank">Reset your password</a> </p>
          `, //html body
    }

    // send email
    await sendEmailWithNodeMailer(emailData)

    return apiSuccess(res, 200, 'Reset password link sent successfully', token)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//PUT /api/users/reset-password
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === 'string') {
      throw new ForbiddenError('Invalid Token', 400)
    }

    //get user data from token
    const { email, hashedPassword } = decoded

    const user = await resetPasswordService(email, hashedPassword)

    if (!user) {
      throw new UnauthorizedError('Invalid Credentials', 400)
    }

    return apiSuccess(res, 200, 'Password reset successfully', user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//PUT /api/users/edit-profile
export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as UserDocument
  const avatar = req.file

  try {
    const update: Partial<UserDocument> = {}

    if (req.body.fullname) {
      update.fullname = req.body.fullname
    }

    if (req.body.email) {
      update.email = req.body.email
    }

    if (req.body.password) {
      const hashedPassword = await hashPassword(req.body.password)
      update.password = hashedPassword
    }

    if (avatar) {
      update.avatar = avatar.filename
    }

    // Call the editUserProfileService to update the user profile
    const updatedUser = await editUserProfileService(user._id, update)

    return apiSuccess(res, 200, 'Profile updated successfully', updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//DELETE /api/users/delete-profile
export const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as UserDocument

  try {
    // Call the deleteUserService to delete the user profile
    const deletedUser = await deleteUserAccountService(user._id)

    return apiSuccess(res, 200, 'Profile deleted successfully', deletedUser)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
