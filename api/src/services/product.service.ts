import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

export const createProductService = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  return product.save()
}

export const findAllProductsService = async (): Promise<ProductDocument[]> => {
  return Product.find()
    .populate('category')
    .select('-__v -createdAt -updatedAt')
    .exec()
}

export const getProductService = async (
  slug: string
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findOne({ slug: slug })
    .populate('category')
    .exec()

  if (!foundProduct) {
    throw new NotFoundError('Product not found')
  }

  return foundProduct
}

export const updateProductService = async (
  slug: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findOneAndUpdate({ slug: slug }, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError('Product not found')
  }

  const updatedProduct = (await foundProduct.save()).populate('category')

  return updatedProduct
}

export const deleteProductService = async (
  slug: string
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findOneAndDelete({ slug: slug })

  if (!foundProduct) {
    throw new NotFoundError('Product not found')
  }

  return foundProduct
}
