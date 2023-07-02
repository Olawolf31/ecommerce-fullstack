import ProductCategory, {
  ProductCategoryDocument,
} from '../models/ProductCategory'
import { NotFoundError } from '../helpers/apiError'

export const createCategoryService = async (
  category: ProductCategoryDocument
): Promise<ProductCategoryDocument> => {
  return category.save()
}

export const listCategoriesService = async (): Promise<
  ProductCategoryDocument[]
> => {
  return ProductCategory.find().select('-__v -createdAt -updatedAt').exec()
}

export const getCategoryService = async (
  slug: string
): Promise<ProductCategoryDocument | null> => {
  const foundCategory = await ProductCategory.findOne({ slug: slug })

  if (!foundCategory) {
    throw new NotFoundError('Category not found')
  }

  return foundCategory
}

export const updateCategoryService = async (
  slug: string,
  category: ProductCategoryDocument
): Promise<ProductCategoryDocument | null> => {
  const foundCategory = await ProductCategory.findOne({ slug: slug })

  if (!foundCategory) {
    throw new NotFoundError('Category not found')
  }

  foundCategory.name = category.name
  foundCategory.slug = category.slug

  const updatedCategory = await foundCategory.save()

  return updatedCategory
}

export const deleteCategoryService = async (
  slug: string
): Promise<ProductCategoryDocument | null> => {
  const foundCategory = await ProductCategory.findOne({ slug: slug })

  if (!foundCategory) {
    throw new NotFoundError('Category not found')
  }

  const deletedCategory = await foundCategory.remove()

  return deletedCategory
}
