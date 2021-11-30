require('dotenv').config()
const mongoose = require('mongoose')
const { app } = require('./app')

// WEBSOCKET CODE
// TODO

// START SERVER
app.listen(process.env.PORT, async () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server started listening on port ${process.env.PORT}`)

  // Connect to MongoDB
  await mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw new Error('Could not connect to MongoDB!')
      /* eslint-disable-next-line no-console */
      console.log('Connected to MongoDB!')
    }
  )
})
