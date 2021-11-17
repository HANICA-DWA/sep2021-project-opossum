exports.logger = (req, res, next) => {
  const { method } = req.method;
  const url = req.originalUrl;
  const status = res.statusCode;
  const log = `${method}:${url} ${status}`;
  console.log(log);
  next();
};

// eslint-disable-next-line no-unused-vars
exports.errorHanlder = (err, req, res, next) => {
  console.log('error: ', err);
  const code = err.code || 500;
  res.status(code).send(err);
};
