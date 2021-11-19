// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  console.log('error: ', err);
  const code = err.code || 500;
  res.status(code).send(err);
};
