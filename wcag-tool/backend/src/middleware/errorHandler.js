/*  eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  /* eslint-disable-next-line no-console */
  console.log('Error: ', err)

  if (err.code && err.message)
    return res.status(err.code).json({ message: err.message })

  return res.status(500).send('Whoops, something went wrong!')
}

module.exports = { errorHandler }
