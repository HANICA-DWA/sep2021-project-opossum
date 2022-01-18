const { Router } = require('express')

const router = new Router()

// add new annotation to the list of annotations in a snapshot
router.post('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  if (Array.isArray(req.body)) {
    try {
      const annotations = await req.snapshot.addAnnotations(req.body)
      if (!annotations) return next({ code: 500, message: 'Annotation could not be added' })

      return res.status(201).json(annotations)
    } catch (err) {
      return next(err)
    }
  } else {
    try {
      const { successCriterium, title, description, selector, labels } = req.body

      const annotation = await req.snapshot.addAnnotation(
        title,
        description,
        selector,
        successCriterium,
        labels
      )

      if (!annotation) return next({ code: 500, message: 'Annotation could not be added' })

      return res.status(201).json(annotation)
    } catch (err) {
      return next(err)
    }
  }
})

// get all annotations for a snapshot
router.get('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  try {
    const { annotations } = req.snapshot // Snapshot already loaded through middleware

    return res.json(annotations)
  } catch (err) {
    return next(err)
  }
})

// edit annotation in a snapshot
router.patch('/snapshots/:snapshotId/annotations/:annotationId', async (req, res, next) => {
  try {
    const { annotationId } = req.params
    const { successCriterium, title, description, selector, labels } = req.body
    if (!successCriterium && !title && !description && !selector && !labels)
      return next({ code: 400, message: 'Invalid patch parameters!' })

    const annotation = await req.snapshot.updateAnnotation(annotationId, {
      successCriterium,
      title,
      description,
      selector,
      labels,
    })
    if (!annotation) return next({ code: 500, message: 'Annotation could not be updated' })

    return res.json(annotation)
  } catch (err) {
    return next(err)
  }
})

// delete annotation from a snapshot
router.delete('/snapshots/:snapshotId/annotations/:annotationId', async (req, res, next) => {
  try {
    const deletedAnnotation = await req.snapshot.deleteAnnotation(req.params.annotationId)
    if (!deletedAnnotation) return next({ code: 404, message: 'Annotation not found!' })

    return res.json(deletedAnnotation)
  } catch (err) {
    return next(err)
  }
})

module.exports = {
  annotationRouter: router,
}
