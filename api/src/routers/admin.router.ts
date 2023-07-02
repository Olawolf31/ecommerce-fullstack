import express from 'express'

//admin controller
import {
  getAllUsers,
  updateUserProfile,
  adminDashboard,
  deleteUser,
} from '../controllers/admin.controller'
//auth
import { isLoggedIn, isAdmin } from '../middlewares/authUser'
//middlewares
import upload from '../middlewares/uploadImages'

const adminRouter = express.Router()

adminRouter.get('/all-users', isLoggedIn, isAdmin, getAllUsers)
adminRouter.put(
  '/update-profile/:id',
  isLoggedIn,
  isAdmin,
  upload('users').single('avatar'),
  updateUserProfile
)
adminRouter.get('/dashboard', isLoggedIn, isAdmin, adminDashboard)
adminRouter.delete('/delete-user/:id', isLoggedIn, isAdmin, deleteUser)

export default adminRouter
