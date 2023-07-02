import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'
import { User, UserDocument } from '../models/User'

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get token from header
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    //if token is missing
    if (!token) {
      throw new NotFoundError('Please login to continue')
    }

    //verify token
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === 'string') {
      throw new ForbiddenError('Invalid Token', 400)
    }

    //check if user exists
    const user = await User.findById(decoded._id).select('-password')

    //if user does not exist
    if (!user) {
      throw new NotFoundError('User not found')
    }

    req.user = user // set user as property of req object
    next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as UserDocument
    //console.log(user)

    // Check if user is not found
    if (!user) {
      throw new NotFoundError('User not found')
    }

    // Check if user is admin
    if (!user.isAdmin) {
      throw new UnauthorizedError(
        'You are not authorized to perform this action. Please contact the admin'
      )
    }

    next()
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
