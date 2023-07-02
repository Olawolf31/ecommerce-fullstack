import express from 'express'

import {
  createProduct,
  findAllProducts,
  findProductBySlug,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller'
import validateProduct from '../validators/product'
import runValidation from '../validators'
import upload from '../middlewares/uploadImages'

const productRouter = express.Router()

productRouter.post(
  '/',
  upload('products').single('image'),
  validateProduct,
  runValidation,
  createProduct
)

productRouter.get('/', findAllProducts)
productRouter.get('/:slug', findProductBySlug)
productRouter.put(
  '/:slug',
  upload('products').single('image'),
  validateProduct,
  runValidation,
  updateProduct
)

productRouter.delete('/:slug', deleteProduct)

export default productRouter
