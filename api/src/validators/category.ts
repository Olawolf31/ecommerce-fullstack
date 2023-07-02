import { body } from 'express-validator'

const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 31 })
    .withMessage('Name must be between 3 and 31 characters'),
]

export default validateCategory
