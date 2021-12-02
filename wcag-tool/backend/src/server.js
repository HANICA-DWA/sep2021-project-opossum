require('dotenv/config')
require('./database')
const { app } = require('./app')

// WEBSOCKET CODE
// TODO

// Start server
app.listen(process.env.PORT, async () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server started listening on port ${process.env.PORT}`)
})
