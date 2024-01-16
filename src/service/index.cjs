const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const express = require('express');
const cors = require('cors');
const app = express();

const { twilioRequestHandler } = require('./twilio-service.cjs');
const { productsRequestHandler } = require('./products-service.cjs');

const allowlist = ['http://localhost:8080', 'https://we-bloom.onrender.com'];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Server is up',
  });
});

twilioRequestHandler(app);
productsRequestHandler(app);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
