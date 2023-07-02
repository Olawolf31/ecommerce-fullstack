import { body } from 'express-validator'

const validateUserRegisteration = [
  body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Fullname must be between 3 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters'),
  body('image').optional(),
]

const validateUserLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters'),
]

export { validateUserRegisteration, validateUserLogin }
