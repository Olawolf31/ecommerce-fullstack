import { Response } from 'express'

export const apiSuccess = (
  res: Response,
  status: number = 200,
  message: string,
  payload: any
) => {
  res.status(status).json({
    success: true,
    message,
    payload,
  })
}
