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

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url)
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/annotations', async (req, res, next) => {
  try {
    const { title, description } = req.body

    const test = new Annotation({ title, description })
    const _test = await test.save()

    return res.status(201).json(_test)
  } catch (err) {
    return next(err)
  }
})

app.get('/annotations', async (req, res, next) => {
  try {
    const tests = await Annotation.find({}).exec()
    if (!tests || tests.length <= 0) return res.status(404).send('No annotation found')

    return res.json(tests)
  } catch (err) {
    return next(err)
  }
})

app.get('/annotations/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const test = await Annotation.findById(id)

    return res.json(test)
  } catch (err) {
    return next(err)
  }
})

app.put('/annotations/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    const test = await Annotation.findById(id)
    test.title = title
    test.description = description

    const _test = await test.save()

    return res.json(_test)
  } catch (err) {
    return next(err)
  }
})

app.delete('/annotations/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const test = await Annotation.findByIdAndDelete(id).exec()

    return res.json(test)
  } catch (err) {
    if (err.response) return next(err.response)
    return next(err)
  }
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
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('Connected to database')
  )
})
