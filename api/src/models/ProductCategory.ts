import { Schema, model, Document } from 'mongoose'

export interface ProductCategoryDocument extends Document {
  name: string
  slug: string
}

const ProductCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is field is required'],
      trim: true,
      minLength: [3, 'Minimum length is 3 characters'],
      maxLength: [31, 'Maximum length is 31 characters'],
    },

    slug: {
      type: String,
      required: [true, 'Slug is required'],
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model<ProductCategoryDocument>(
  'ProductCategory',
  ProductCategorySchema
)
