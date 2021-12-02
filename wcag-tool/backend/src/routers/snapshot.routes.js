const { Router } = require('express')
const { Snapshot } = require('../models')
const { getUpload } = require('../database')

const router = new Router()

const upload = getUpload(['text/html'])

router.post('/snapshots', upload.single('file'), async (req, res, next) => {
  try {
    const { name, domain } = req.body
    console.log(req.body)

    if (!req.file) return next({ code: 400, message: 'File not provided!' })

    const snapshot = await new Snapshot({ name, domain, filename: req.file.filename }).save()
    if (!snapshot) return next({ code: 500, message: 'Snapshot not created!' })

    // TODO: Welke data is belangrijk om te returnen?
    return res.status(201).json(snapshot)
  } catch (err) {
    return next(err)
  }
})

router.get('/snapshots', async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const skip = page * (limit - 1) > 0 ? page * (limit - 1) : 0

    const snapshots = await Snapshot.find({}).skip(skip).limit(limit).exec()

    return res.json(snapshots)
  } catch (err) {
    return next(err)
  }
})

// Already done by middleware: loadSnapshot!
router.get('/snapshots/:snapshotId', (req, res) => res.json(req.snapshot))

router.put('/snapshots/:snapshotId', async (req, res, next) => {
  try {
    const { name, domain } = req.body
    const { snapshot } = req

    if (name) snapshot.name = name
    if (domain) snapshot.domain = domain

    // eslint-disable-next-line no-underscore-dangle
    const _snapshot = await snapshot.save()
    if (_snapshot) return next({ error: 500, message: 'Snapshot not updated!' })

    return res.json(_snapshot)
  } catch (err) {
    return next(err)
  }
})

router.delete('/snapshots/:snapshotId', async (req, res, next) => {
  try {
    const { snapshotId } = req.params

    const snapshot = await Snapshot.findByIdAndRemove(snapshotId).exec()
    if (!snapshot) return next({ error: 500, message: 'Snapshot not deleted!' })

    return res.json(snapshot)
  } catch (err) {
    return next(err)
  }
})

module.exports = { snapshotRouter: router }
