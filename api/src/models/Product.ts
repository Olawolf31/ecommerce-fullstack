import { Document, Schema, model } from 'mongoose'

export interface ProductDocument extends Document {
  title: string
  slug: string
  description: string
  price: number
  category: string
  stock: number
  image: string
  sold: number
}

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minLength: [3, 'Minimum length is 3 characters'],
      maxLength: [160, 'Maximum length is 160 characters'],
    },

    slug: {
      type: String,
      required: [true, 'Slug is required'],
      trim: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minLength: [3, 'Minimum length is 3 characters'],
      maxLength: [2000000, 'Maximum length is 2 000 000 characters'],
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      trim: true,
      maxLength: [32, 'Maximum length is 32 characters'],
      validate: {
        validator: function (v: number) {
          return /^\d+(\.\d{1,2})?$/.test(String(v))
        },
        message: (props: any) => `${props.value} is not a valid price!`,
      },
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: [true, 'Category is required'],
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
    },

    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default model<ProductDocument>('Product', ProductSchema)
