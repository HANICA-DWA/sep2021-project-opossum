// logger for development
exports.logger = (req, res, next) => {
  const { method } = req.method;
  const url = req.originalUrl;
  const status = res.statusCode;
  const log = `${method}:${url} ${status}`;
  console.log(log);
  next();
};
