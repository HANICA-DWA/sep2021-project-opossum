require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { logger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const snapshotRouter = require('./routers/snapshotRouter');
const wcagRuleRouter = require('./routers/wcagRuleRouter');

const app = express();

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

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log(`wcag-tool server started on port ${process.env.PORT}`);
  });
});
