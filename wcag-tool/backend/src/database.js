const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage')
const multer = require('multer')

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw new Error('Could not connect to MongoDB!')
    /* eslint-disable-next-line no-console */
    console.log('Connected to MongoDB!')
  }
)

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    if (file.mimetype === 'image/jpeg') {
      return {
        bucketName: 'images',
      }
    }
    if (file.mimetype === 'text/html') {
      return {
        bucketName: 'snapshot',
      }
    }
    // use default config
    return null
  },
})

const getUpload = (fileTypes) =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      // if file is not html dont upload
      if (!file.mimetype.includes(fileTypes)) {
        cb(new Error(`Only ${fileTypes} files are allowed`))
      } else {
        cb(null, true)
      }
    },
  })

module.exports = {
  getUpload,
}
