const { Router } = require('express');
const { Snapshot } = require('../models');

const router = new Router();

router.post('/snapshots', async (req, res, next) => {
  try {
    const { name, domain } = req.body;

    const snapshot = await new Snapshot({ name, domain }).save();
    if (!snapshot) return next({ code: 500, message: 'Snapshot not created!' });

    // TODO: Welke data is belangrijk om te returnen?
    return res.status(201).json(snapshot);
  } catch (err) {
    return next(err);
  }
});

router.get('/snapshots', async (req, res, next) => {
  try {
    const snapshots = await Snapshot.find({}).exec();

    return res.json(snapshots);
  } catch (err) {
    return next(err);
  }
});

// Already done by middleware: loadSnapshot!
router.get('/snapshots/:snapshotId', (req, res) => res.json(req.snapshot));

router.put('/snapshots/:snapshotId', async (req, res, next) => {
  try {
    const { name, domain } = req.body;
    const snapshot = req.snapshot;

    if (name) snapshot.name = name;
    if (domain) snapshot.domain = domain;

    const _snapshot = await snapshot.save();
    if (_snapshot)
      return next({ error: 500, message: 'Snapshot not updated!' });

    return res.json(_snapshot);
  } catch (err) {
    return next(err);
  }
});

router.delete('/snapshots/:snapshotId', async (req, res, next) => {
  try {
    const { snapshotId } = req.params;

    const snapshot = await Snapshot.findByIdAndRemove(snapshotId).exec();
    if (!snapshot)
      return next({ error: 500, message: 'Snapshot not deleted!' });

    return res.json(snapshot);
  } catch (err) {
    return next(err);
  }
});

module.exports = { snapshotRouter: router };
