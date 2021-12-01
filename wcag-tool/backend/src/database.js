const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage')

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
    } else if (file.mimetype === 'text/html') {
      return {
        bucketName: 'snapshot',
      }
    }
  },
})

module.exports = {
  storage,
}
