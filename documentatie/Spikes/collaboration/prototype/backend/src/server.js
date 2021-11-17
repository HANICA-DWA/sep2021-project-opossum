const express = require('express')
const app = express()

// Static test client
app.use('/client', express.static('./public/client'))

app.get('/', (req, res) => {
  return res.send('Hello world!')
})

app.listen(3000, () => {
  console.log('Yjs prototype app listening at http://localhost:3000')
})
