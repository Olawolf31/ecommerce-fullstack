import { User, UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'
import mongoose from 'mongoose'

export const registerUserService = async (token: string): Promise<string> => {
  return token
}

export const activateUserService = async (
  newUser: UserDocument
): Promise<UserDocument> => {
  return newUser.save()
}

export const loginUserService = async (
  email: string
): Promise<UserDocument | null> => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFoundError(`User with email ${email} not found`)
  }

  return user
}

export const forgotPasswordService = async (
  email: string
): Promise<UserDocument | null> => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFoundError(`User with email ${email} not found`)
  }

  return user
}

export const resetPasswordService = async (
  email: string,
  password: string
): Promise<UserDocument | null> => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFoundError(`User with email ${email} not found`)
  } else {
    user.password = password
    user.save()
  }

  return user
}

/* export const editUserProfileService = async (
  id: mongoose.Types.ObjectId,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const updatedUser = await User.findOneAndUpdate({ _id: id }, update, {
    new: true,
  })

  if (!updatedUser) {
    throw new NotFoundError(`User with id ${id} not found`)
  }

  return updatedUser
} */

export const editUserProfileService = async (
  id: mongoose.Types.ObjectId,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const updatedUser = await User.findByIdAndUpdate(id, update, { new: true })

  if (!updatedUser) {
    throw new NotFoundError(`User with id ${id} not found`)
  }

  return updatedUser
}

export const deleteUserAccountService = async (
  id: mongoose.Types.ObjectId
): Promise<UserDocument | null> => {
  const user = await User.findOneAndDelete({ _id: id })

  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`)
  }

  return user
}
