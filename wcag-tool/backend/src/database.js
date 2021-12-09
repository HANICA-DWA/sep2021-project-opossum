const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage')
const multer = require('multer')
const { createModel } = require('mongoose-gridfs')

// Connect to MongoDB
const connection = mongoose.createConnection(
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
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
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

const getFileCollection = (collectionName) => {
  if (!['snapshot', 'images'].includes(collectionName)) throw new Error('Invalid collection name')
  const model = createModel(connection, collectionName)
  return model
}

module.exports = {
  getUpload,
  getFileCollection,
}
