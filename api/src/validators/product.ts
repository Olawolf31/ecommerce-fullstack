import { body } from 'express-validator'

const validateProduct = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 160 })
    .withMessage('Title must be between 3 and 160 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 3, max: 2000000 })
    .withMessage('Description must be between 3 and 2 000 000 characters'),
  body('price')
    .trim()
    .notEmpty()
    .withMessage('Price is required')
    .isLength({ min: 1, max: 32 })
    .withMessage('Price must be between 1 and 32 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ min: 3, max: 31 })
    .withMessage('Category must be between 3 and 31 characters'),
  body('stock')
    .trim()
    .notEmpty()
    .withMessage('Stock is required')
    .isLength({ min: 1, max: 32 })
    .withMessage('Stock must be between 1 and 32 characters'),

  body('image').optional(),
  body('sold')
    .trim()
    .notEmpty()
    .withMessage('Sold is required')
    .isLength({ min: 1, max: 32 })
    .withMessage('Sold must be between 1 and 32 characters'),
]

export default validateProduct
