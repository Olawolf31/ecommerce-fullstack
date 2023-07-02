import express from 'express'

//user controller
import {
  Register,
  ActivateUser,
  Login,
  Logout,
  UserProfile,
  forgotPassword,
  resetPassword,
  editProfile,
  deleteProfile,
} from '../controllers/user.controller'

//validators
import {
  validateUserRegisteration,
  validateUserLogin,
} from '../validators/user'
import runValidation from '../validators'

//middlewares
import upload from '../middlewares/uploadImages'

//auth
import { isLoggedIn, isAdmin } from '../middlewares/authUser'

const userRouter = express.Router()

userRouter.post(
  '/register',
  upload('users').single('avatar'),
  validateUserRegisteration,
  runValidation,
  Register
)

userRouter.post('/activate', ActivateUser)
userRouter.post('/login', validateUserLogin, runValidation, Login)
userRouter.post('/logout', Logout)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:token', resetPassword)
userRouter.get('/profile', isLoggedIn, UserProfile)
userRouter.put(
  '/edit-profile',
  upload('users').single('avatar'),
  isLoggedIn,
  editProfile
)
userRouter.delete('/delete-profile', isLoggedIn, deleteProfile)

export default userRouter
