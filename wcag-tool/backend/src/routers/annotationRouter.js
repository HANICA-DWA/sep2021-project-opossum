const mongoose = require('mongoose');
require('../mongoose/models/snapshot');
const express = require('express');

const router = express.Router();
const Snapshot = mongoose.model('Snapshot');

// get annotations for a snapshot
// basic example to be modified
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await Snapshot.findById(req.params.snapshotId);
    res.send(snapshot.annotations);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
