/* eslint-disable no-unused-vars */
const multer = require('multer')
const path = require('path')
const { success, failed } = require('../helpers/response')
// const { nextTick } = require('process')

// management file
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public')
    },
    filename: (res, file, cb) => {
      const ext = path.extname(file.originalname)
      const filename = `${Date.now()}${ext}`
      cb(null, filename)
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLocaleLowerCase()
    if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
      cb(null, true)
    } else {
      const error = {
        message: 'file must be jpg, jpeg or png'
      }
      cb(error, false)
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024
  }
})

// middleware
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('gambar')
  multerSingle(req, res, (err) => {
    if (err) {
      // res.json({
      //   message: 'error',
      //   error: err
      // })
      failed(res, err.message, 'failed', 'failed to upload')
    } else {
      next()
    }
  })
}

module.exports = upload
