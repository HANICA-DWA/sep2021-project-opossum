const { GridFsStorage } = require('multer-gridfs-storage')

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
