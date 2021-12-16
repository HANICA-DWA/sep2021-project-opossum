const express = require('express')
const cors = require('cors')

const { errorHandler, loadSnapshot, logger } = require('./middleware')
const { annotationRouter, snapshotRouter, wcagRouter } = require('./routers')

const app = express()
app.disable('x-powered-by')

// Register middleware
app.use(cors({ origin: '*' }))
app.use(express.json())

if (process.env.NODE_ENV !== 'test') app.use(logger)

// Routes
app.get('/', (req, res) => res.send('Hello World!'))

app.use('/v1/snapshots/:snapshotId', loadSnapshot) // TODO: exclude delete method from this middleware
app.use('/v1/', annotationRouter)
app.use('/v1/', snapshotRouter)
app.use('/v1/', wcagRouter)

// Register error handler
app.use(errorHandler)

module.exports = { app }
