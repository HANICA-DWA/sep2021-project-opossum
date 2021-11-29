const logger = (req, res, next) => {
  const log = `${req.method} ${req.originalUrl} ${res.statusCode}`
  /* eslint-disable-next-line no-console */
  console.log(log)
  next()
}

module.exports = {
  logger,
}
