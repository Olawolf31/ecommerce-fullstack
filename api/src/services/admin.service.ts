import { User, UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'
import mongoose from 'mongoose'
import { Types } from 'mongoose'

export const getAllUsersService = async (): Promise<UserDocument[]> => {
  const users = await User.find()
  return users
}

/* export const updateUserService = async (
  id: mongoose.Types.ObjectId,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const user = await User.findOneAndUpdate({ _id: id }, update, {
    new: true,
  })

  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`)
  }

  return user
} */

export const updateUserService = async (
  id: mongoose.Types.ObjectId,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const user = await User.findByIdAndUpdate(id, update, {
    new: true,
  })

  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`)
  }

  return user
}

export const adminDashboardService = async (
  id: mongoose.Types.ObjectId
): Promise<UserDocument | null> => {
  const user = await User.findOne({ _id: id })

  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`)
  }

  return user
}
