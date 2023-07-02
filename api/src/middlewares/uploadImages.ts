import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 1024 * 1024 * 2 // 2MB
const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES || [
  'jpg',
  'jpeg',
  'png',
]

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const extname = path.extname(file.originalname)
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    const error = new Error('File type not allowed')
    console.log('ERROR: ', error)
    return cb(error)
  }
  cb(null, true)
}

const upload = (folderName: string) =>
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `public/images/${folderName}`)
      },
      filename: function (req, file, cb) {
        const extname = path.extname(file.originalname)
        cb(
          null,
          Date.now() + '-' + file.originalname.replace(extname, '') + extname
        )
      },
    }),
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter,
  })

export default upload
