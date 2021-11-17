const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middleware');

const app = express();
const port = 3000;
const mongoPort = 27017;
const dbName = 'wcag-tool';

app.use(cors({ origin: true, credentials: true }));
app.options('*', cors({ origin: true, credentials: true }));
app.use(logger);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  mongoose.connect(
    `mongodb://localhost:${mongoPort}/${dbName}`,
    { useNewUrlParser: true },
    () => {
      console.log(`wcag-tool server started on port ${port}`);
    }
  );
});
