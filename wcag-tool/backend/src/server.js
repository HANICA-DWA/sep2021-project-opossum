require('dotenv/config')

const { createServer } = require('http')

const { app } = require('./app')
const { wsServer } = require('./websocket')

const httpServer = createServer(app)

// Database code
require('./database')

// Websocket code
httpServer.on('upgrade', (req, socket, head) => {
  // TODO authenticate requests here!

  // eslint-disable-next-line no-unused-vars
  wsServer.handleUpgrade(req, socket, head, (ws, _req) => {
    wsServer.emit('connection', ws, req)
  })
})

// Start server
httpServer.listen(process.env.PORT, async () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server started listening on port ${process.env.PORT}`)
})
