/* eslint-disable radix */
const { Router } = require('express')
const { Snapshot } = require('../models')
const { getUpload, getBucket } = require('../database')

const router = new Router()

const upload = getUpload(['text/html'])

router.post('/snapshots', upload.single('file'), async (req, res, next) => {
  try {
    const { name, domain } = req.body

    if (!req.file) return next({ code: 400, message: 'File not provided!' })

    const snapshot = await new Snapshot({ name, domain, filename: req.file.filename }).save()
    if (!snapshot) return next({ code: 500, message: 'Snapshot not created!' })

    return res.status(201).json(snapshot) // TODO: Which data is necessary? Only meta data or everything?
  } catch (err) {
    return next(err)
  }
})

router.get('/snapshots', async (req, res, next) => {
  try {
    const { page: _page, limit: _limit } = req.query
    if ((_page && _page < 1) || (_limit && _limit < 1) || (_page && !_limit))
      return next({ code: 400, message: 'Invalid pagination parameters!' })

    const page = _page ? parseInt(_page) : undefined
    const limit = _limit ? parseInt(_limit) : undefined
    const skip = page && limit ? (page - 1) * limit : 0

    const snapshots = await Snapshot.find({}).skip(skip).limit(limit).exec() // TODO: Add projection, only meta data is necessary!

    return res.json(snapshots)
  } catch (err) {
    return next(err)
  }
})

// Already done by middleware: loadSnapshot!
router.get('/snapshots/:snapshotId', (req, res) => res.json(req.snapshot))

router.get('/snapshots/:snapshotId/:filename', (req, res, next) => {
  try {
    const gfs = getBucket('snapshot')

    const readstream = gfs.openDownloadStreamByName(req.params.filename)
    return readstream.pipe(res)
  } catch (err) {
    return next(err)
  }
})

router.patch('/snapshots/:snapshotId', async (req, res, next) => {
  try {
    const { name, domain } = req.body
    const { snapshot } = req

    if (name) snapshot.name = name
    if (domain) snapshot.domain = domain

    // eslint-disable-next-line no-underscore-dangle
    const _snapshot = await snapshot.save()
    if (!_snapshot) return next({ error: 500, message: 'Snapshot not updated!' })

    return res.json(_snapshot) // TODO: Which data is necessary?
  } catch (err) {
    return next(err)
  }
})

router.delete('/snapshots/:snapshotId', async (req, res, next) => {
  try {
    const { snapshotId } = req.params

    const snapshot = await Snapshot.findByIdAndRemove(snapshotId).exec()
    if (!snapshot) return next({ error: 500, message: 'Snapshot not deleted!' })

    return res.json(snapshot) // TODO: Which data is necessary?
  } catch (err) {
    return next(err)
  }
})

module.exports = { snapshotRouter: router }
