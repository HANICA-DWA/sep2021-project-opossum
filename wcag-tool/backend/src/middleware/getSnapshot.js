const mongoose = require('mongoose');
require('../models/snapshot');

const Snapshot = mongoose.model('Snapshot');

// sets snapshot on the request object
exports.getSnapshot = async (req, res, next) => {
  if (req.params.snapshotId) {
    try {
      const snapshot = await Snapshot.findById(req.params.snapshotId);
      if (!snapshot) {
        return next({ code: 400, message: 'Deze snapshot bestaat niet' });
      }
      req.snapshot = snapshot;
    } catch (err) {
      next(err);
    }
  }
  return next();
};
