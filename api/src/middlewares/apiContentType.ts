import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'

export default function (req: Request, res: Response, next: NextFunction) {
  const contentType = req.get('Content-Type')
  if (
    (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') &&
    !(
      contentType &&
      (contentType.includes('application/json') ||
        contentType.includes('application/x-www-form-urlencoded'))
    )
  ) {
    next(
      new BadRequestError('Request body must be of type json, or url-encoded')
    )
  } else {
    next()
  }
}
