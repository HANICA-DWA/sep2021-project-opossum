const mongoose = require('mongoose');
require('./mongoose/models/snapshot');

const Snapshot = mongoose.model('Snapshot');

exports.logger = (req, res, next) => {
  const { method } = req.method;
  const url = req.originalUrl;
  const status = res.statusCode;
  const log = `${method}:${url} ${status}`;
  console.log(log);
  next();
};

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  console.log('error: ', err);
  const code = err.code || 500;
  res.status(code).send(err);
};

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
