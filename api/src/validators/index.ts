import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import ApiError from '../helpers/apiError'

const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ApiError(422, errors.array()[0].msg)
    }
    next()
  } catch (error) {
    next(error)
  }
}

export default validate
