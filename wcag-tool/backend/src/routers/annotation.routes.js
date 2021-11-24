const { Router } = require('express');
const { Annotation } = require('../models');

const router = new Router();

router.get('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  try {
    const { annotations } = req.snapshot; // Snapshot already loaded through middleware

    return res.json(annotations);
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  annotationRouter: router,
};
