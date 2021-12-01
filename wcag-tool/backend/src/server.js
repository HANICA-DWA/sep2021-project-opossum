require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('./database')

const { errorHandler, loadSnapshot, logger } = require('./middleware')
const { annotationRouter, snapshotRouter, wcagRouter } = require('./routers')

const app = express()
app.disable('x-powered-by')

// EXPRESS CODE
// Register middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(logger)

// Routes
app.get('/', (req, res) => res.send('Hello World!'))

app.use('/v1/snapshots/:snapshotId', loadSnapshot) // TODO: exclude delete method from this middleware
app.use('/v1/', annotationRouter)
app.use('/v1/', snapshotRouter)
app.use('/v1/', wcagRouter)

// Register error handler
app.use(errorHandler)

// WEBSOCKET CODE
// TODO

// START SERVER
app.listen(process.env.PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server started listening on port ${process.env.PORT}`)
})
