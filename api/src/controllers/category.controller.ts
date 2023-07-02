import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'

import ProductCategory from '../models/ProductCategory'
import {
  createCategoryService,
  listCategoriesService,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from '../services/category.service'
import { BadRequestError } from '../helpers/apiError'
import { apiSuccess } from '../helpers/apiSuccess'

// POST /categories
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body

    const category = new ProductCategory({
      name,
      slug: slugify(name),
    })

    const newCategory = await createCategoryService(category)
    return apiSuccess(res, 201, 'Category created', newCategory)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /categories
export const listCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await listCategoriesService()
    return apiSuccess(res, 200, 'Fetch categories successfully', categories)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /categories/:slug
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params.slug
    const category = await getCategoryService(slug)
    return apiSuccess(res, 200, 'Fetch category successfully', category)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /categories/:slug
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slug = req.params.slug
  const { name } = req.body

  const category = new ProductCategory({
    name,
    slug: slugify(name),
  })
  try {
    const updatedCategory = await updateCategoryService(slug, category)
    return apiSuccess(res, 200, 'Category updated', updatedCategory)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /categories/:slug
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slug = req.params.slug
  try {
    const deletedCategory = await deleteCategoryService(slug)
    return apiSuccess(res, 200, 'Category deleted', deletedCategory)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
