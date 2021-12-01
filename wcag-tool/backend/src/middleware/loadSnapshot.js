const { Snapshot } = require('../models')

const loadSnapshot = async (req, res, next) => {
  if (!req.params.snapshotId) return next()

  try {
    const snapshot = await Snapshot.findById(req.params.snapshotId).exec()
    if (!snapshot) return next({ code: 404, message: 'Snapshot not found!' })

    req.snapshot = snapshot
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  loadSnapshot,
}
