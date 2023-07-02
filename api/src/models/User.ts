import { Schema, model, Document } from 'mongoose'

export interface UserDocument extends Document {
  fullname: string
  email: string
  password: string
  avatar: string
  isBanned: boolean
  isAdmin: boolean
}

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Title is required'],
      minLength: [3, 'Minimum length is 3 characters'],
      maxLength: [50, 'Maximum length is 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [4, 'Minimum length is 6 characters'],
    },
    avatar: { type: String, default: 'public/images/users/default-avatar.jpg' },
    isBanned: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const User = model<UserDocument>('User', userSchema)
