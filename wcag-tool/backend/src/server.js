const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { logger, errorHandler } = require('./middleware');
const snapshotRouter = require('./routers/snapshotRouter');
const wcagRuleRouter = require('./routers/wcagRuleRouter');

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

app.use('/snapshot', snapshotRouter);
app.use('/wcag-rule', wcagRuleRouter);

app.use(errorHandler);

app.listen(port, () => {
  mongoose.connect(
    `mongodb://localhost:${mongoPort}/${dbName}`,
    { useNewUrlParser: true },
    () => {
      console.log(`wcag-tool server started on port ${port}`);
    }
  );
});
