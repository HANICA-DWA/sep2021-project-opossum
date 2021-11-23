#!/usr/bin/env node

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const ws = require('ws')
const mongoose = require('mongoose')
const { setupWSConnection } = require('y-websocket/bin/utils')

const app = express()
const httpServer = http.createServer(app)
const wsServer = new ws.Server({ noServer: true })

// MONGOOSE CODE
const annotationSchema = new mongoose.Schema({
  title: String,
  description: String,
})
const Annotation = mongoose.model('Annotation', annotationSchema)

const snapshotSchema = new mongoose.Schema({
  domain: String,
  annotations: {
    type: [annotationSchema],
    default: [],
  },
})

snapshotSchema.methods.addAnnotation = async function (title, description) {
  const annotation = new Annotation({
    title: title,
    description: description,
  })

  console.log(annotation)

  this.annotations.push(annotation)
  const _snapshot = this.save()

  return annotation
}

const Snapshot = mongoose.model('Snapshot', snapshotSchema)

// EXPRESS CODE
app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url)
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/snapshots', async (req, res, next) => {
  try {
    const { domain } = req.body

    const snapshot = new Snapshot({ domain: domain })
    const _snapshot = await snapshot.save()
    if (!_snapshot) return res.status(418).send('Error saving snapshot')

    return res.json(_snapshot)
  } catch (err) {
    return next(err)
  }
})

app.get('/snapshots', async (req, res, next) => {
  try {
    const snapshots = await Snapshot.find({}).exec()
    if (!snapshots || snapshots.length < 1) return res.status(404).send('No snapshots found')

    return res.json(snapshots)
  } catch (err) {
    return next(err)
  }
})

app.get('/snapshots/:snapshotId', async (req, res, next) => {
  try {
    const { snapshotId } = req.params

    const snapshot = await Snapshot.findById(snapshotId).exec()
    if (!snapshot) return res.status(404).send('Snapshot not found')

    return res.json(snapshot)
  } catch (err) {
    return next(err)
  }
})

app.post('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  try {
    const { snapshotId } = req.params
    const { title, description } = req.body

    const snapshot = await Snapshot.findById(snapshotId).exec()
    if (!snapshot) return res.status(404).send('Snapshot not found')

    const annotation = await snapshot.addAnnotation(title, description)
    if (!annotation) return res.status(418).send('Error saving annotation')

    return res.status(201).json(annotation)
  } catch (err) {
    return next(err)
  }
})

app.get('/snapshots/:snapshotId/annotations', async (req, res, next) => {
  try {
    const { snapshotId } = req.params

    const snapshot = await Snapshot.findById(snapshotId).exec()
    if (!snapshot) return res.status(404).send('Snapshot not found')

    return res.json(snapshot.annotations)
  } catch (err) {
    return next(err)
  }
})

app.get('/snapshots/:snapshotId/annotations/:annotationid', async (req, res, next) => {
  try {
    const { snapshotId, annotationid } = req.params

    const snapshot = await Snapshot.findById(snapshotId).exec()
    if (!snapshot) return res.status(404).send('Annotation not found')

    const annotation = snapshot.annotations.id(annotationid)
    if (!annotation) return res.status(404).send('Annotation not found')

    return res.json(annotation)
  } catch (err) {
    return next(err)
  }
})

// Edit single snapshot
app.put('/snapshots/:snapshotId/annotations/:annotationId', async (req, res, next) => {
  try {
    const { snapshotId, annotationId } = req.params
    const { title, description } = req.body

    const snapshot = await Snapshot.findById(snapshotId).exec()
    if (!snapshot) return res.status(404).send('Snapshot not found')

    const annotation = await snapshot.annotations.id(annotationId)
    if (!annotation) return res.status(404).send('Annotation not found')

    if (title) annotation.title = title
    if (description) annotation.description = description
    annotation.parent().save()

    return res.json(annotation)
  } catch (err) {
    return next(err)
  }
})

app.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).send(err)
})

// WEBSOCKET CODE
wsServer.on('connection', (ws, req) => {
  setupWSConnection(ws, req)

  console.log('[WS] New connection!')

  ws.on('open', () => console.log('[WS] Connection opened!'))
  ws.on('close', (code, reason) => console.log('[WS] Connection closed:', code, reason.toString()))
  ws.on('error', (err) => console.log('[WS] Connection error:', err))
})

httpServer.on('upgrade', (req, socket, head) => {
  // You may check auth of request here..

  wsServer.handleUpgrade(req, socket, head, (ws, _req) => {
    wsServer.emit('connection', ws, req)
  })
})

httpServer.listen(process.env.PORT, async () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)

  // Connect to database
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log('Error connecting to database: ' + err)
      console.log('Shutting down server...')
      return httpServer.close()
    }
    console.log('Connected to database')
  })
})
