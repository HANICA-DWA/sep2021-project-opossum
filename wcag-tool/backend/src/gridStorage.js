const { GridFsStorage } = require('multer-gridfs-storage')

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

module.exports = {
  storage,
}
