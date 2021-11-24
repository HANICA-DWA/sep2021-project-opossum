const logger = (req, res, next) => {
  const log = `${req.method} ${req.originalUrl} ${res.statusCode}`;
  console.log(log);
  next();
};

module.exports = {
  logger,
};
