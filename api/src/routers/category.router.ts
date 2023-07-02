import express from 'express'
import runValidation from '../validators'
import validateCategory from '../validators/category'

import {
  createCategory,
  listCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller'

const categoryRouter = express.Router()

categoryRouter.post('/', validateCategory, runValidation, createCategory)
categoryRouter.get('/', listCategories)
categoryRouter.get('/:slug', getCategory)
categoryRouter.put('/:slug', validateCategory, runValidation, updateCategory)
categoryRouter.delete('/:slug', deleteCategory)

export default categoryRouter
