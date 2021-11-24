const errorHandler = (err, req, res, next) => {
  console.log('Error: ', err);

  if (err.code && err.message)
    return res.status(err.code).json({ message: err.message });

  return res.status(500).send('Whoops, something went wrong!');
};

module.exports = { errorHandler };
