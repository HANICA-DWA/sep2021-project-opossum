const mongoose = require('mongoose');
require('../models/snapshot');
const express = require('express');
const annotationRouter = require('./annotationRouter');
const { getSnapshot } = require('../middleware/getSnapshot');

const router = express.Router();
const Snapshot = mongoose.model('Snapshot');

router.use('/:snapshotId', getSnapshot);
router.use('/:snapshotId/annotation', annotationRouter);

// basic example to be modified
// router to get all snapshots.
router.get('/', async (req, res, next) => {
  try {
    const snapshots = await Snapshot.find();
    res.send(snapshots);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
