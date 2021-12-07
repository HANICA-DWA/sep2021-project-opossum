const { Router } = require('express')
const { Annotation } = require('../models')

const router = new Router()

// add new annotation to the list of annotations in a snapshot
router.post('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  try {
    const { successCriterium, title, description, selector } = req.body

    const annotation = await req.snapshot.addAnnotation(
      title,
      description,
      selector,
      successCriterium
    )

    if (!annotation) return next({ code: 500, message: 'Annotation could not be added' })

    return res.status(201).json(annotation)
  } catch (err) {
    return next(err)
  }
})

router.get('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  try {
    console.log(req.body)

    const { successCriterium, title, description, selector } = req.body

    const annotation = await req.snapshot.addAnnotation(
      successCriterium,
      title,
      description,
      selector
    )
    if (!annotation) return next({ code: 500, message: 'Annotation could not be added' })

    return res.status(201).json(annotation)
  } catch (err) {
    return next(err)
  }
})

// edit annotation in a snapshot
router.patch('/snapshots/:snapshotId/annotations/:annotationId', async (req, res, next) => {
  try {
    const { annotationId } = req.params
    const { successCriterium, title, description, selector } = req.body

    const annotation = await req.snapshot.updateAnnotation(annotationId, {
      successCriterium,
      title,
      description,
      selector,
    })
    if (!annotation) return next({ code: 500, message: 'Annotation could not be updated' })

    return res.json(annotations)
  } catch (err) {
    return next(err)
  }
})

// delete annotation from a snapshot
router.delete('/snapshots/:snapshotId/annotations/:annotationId', async (req, res, next) => {
  try {
    const deletedAnnotation = await req.snapshot.deleteAnnotation(req.params.annotationId)
    if (!deletedAnnotation) return next({ code: 404, message: 'Could not find annotation' })

    return res.json(deletedAnnotation)
  } catch (err) {
    return next(err)
  }
})

module.exports = {
  annotationRouter: router,
}
