const { Router } = require('express')
const { Annotation } = require('../models')

const router = new Router()

router.get('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  try {
    const { annotations } = req.snapshot // Snapshot already loaded through middleware

    return res.json(annotations)
  } catch (err) {
    return next(err)
  }
})

// add new annotation to the list of annotations in a snapshot
router.post('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  try {
    const { title, description, selector } = req.body

    const annotation = await req.snapshot.addAnnotation(title, description, selector)

    if (!annotation) return next({ code: 500, message: 'Annotation could not be added' })

    return res.json(annotation)
  } catch (err) {
    return next(err)
  }
})

module.exports = {
  annotationRouter: router,
}
