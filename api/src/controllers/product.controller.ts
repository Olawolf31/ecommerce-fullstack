import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product'
import {
  createProductService,
  findAllProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
} from '../services/product.service'
import { BadRequestError } from '../helpers/apiError'
import { apiSuccess } from '../helpers/apiSuccess'
import slugify from 'slugify'

// POST /product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file

    const newProduct = new Product({
      ...req.body,
      slug: slugify(req.body.title),
      image: image?.filename,
    })

    await createProductService(newProduct)

    return apiSuccess(
      res,
      201,
      'Product has been added successfully',
      newProduct
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /product
export const findAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await findAllProductsService()

    return apiSuccess(res, 200, 'All products', products)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /product/:slug
export const findProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slug = req.params.slug

  try {
    const foundProduct = await getProductService(slug)

    return apiSuccess(res, 200, 'Product found', foundProduct)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /product/:slug
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slug = req.params.slug
  const image = req.file

  const updateProduct = {
    ...req.body,
    slug: slugify(req.body.title),
    image: image?.filename,
  }

  try {
    const updatedProduct = await updateProductService(slug, updateProduct)

    return apiSuccess(res, 200, 'Product updated', updatedProduct)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /product/:slug
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slug = req.params.slug

  try {
    const deletedProduct = await deleteProductService(slug)

    return apiSuccess(res, 200, 'Product deleted', deletedProduct)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
