import { Request, Response, NextFunction } from 'express'
import { User, UserDocument } from '../models/User'
import { BadRequestError } from '../helpers/apiError'
import {
  getAllUsersService,
  updateUserService,
  adminDashboardService,
} from '../services/admin.service'
import { apiSuccess } from '../helpers/apiSuccess'
import { hashPassword } from '../util/bcrypt'
import { Types } from 'mongoose'
import mongoose from 'mongoose'

//GET /api/users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsersService()
    return apiSuccess(res, 200, 'Users retrieved successfully', users)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /api/admin/update-profile/:id
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = new mongoose.Types.ObjectId(req.params.id)
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

    if (req.body.isBanned) {
      update.isBanned = req.body.isBanned
    }

    if (req.body.isAdmin) {
      update.isAdmin = req.body.isAdmin
    }

    const updatedUser = await updateUserService(userId, update)

    return apiSuccess(res, 200, 'User updated successfully', updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//GET /api/admin/dashboard
export const adminDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as UserDocument

  try {
    const dashboard = await adminDashboardService(user._id)
    return apiSuccess(
      res,
      200,
      'Admin dashboard retrieved successfully',
      dashboard
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//DELETE /api/admin/delete-user/:id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    return apiSuccess(res, 200, 'User deleted successfully', user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
