/* eslint-disable no-console */
const { Server } = require('ws')
const { setupWSConnection } = require('y-websocket/bin/utils')

const wsServer = new Server({ noServer: true })

wsServer.on('connection', (ws, req) => {
  setupWSConnection(ws, req)

  console.log('[WS] New connection!')

  ws.on('open', () => console.log('[WS] Connection opened!'))
  ws.on('close', (code, reason) => console.log('[WS] Connection closed:', code, reason.toString()))
  ws.on('error', (err) => console.log('[WS] Connection error:', err))
})

module.exports = { wsServer }
