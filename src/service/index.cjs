const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const stripeSecretKey = process.env.VITE_STRIPE_SECRET_KEY;

const stripe = require('stripe')(stripeSecretKey);
const express = require('express');
const cors = require('cors');
const app = express();

const { twilioRequestHandler } = require('./twilio-service.cjs');
const { productsRequestHandler } = require('./products-service/index.cjs');
const { cartsProductsRequestHandler } = require('./carts-service/index.cjs');
const { ordersRequestHandler } = require('./orders-service/index.cjs');

const allowlist = [
  'http://localhost:8080',
  'https://we-bloom.onrender.com',
  'https://checkout.stripe.com',
];
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
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); // Do nothing, return body in a raw state
  } else {
    express.json()(req, res, next);
  }
});

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Server is up',
  });
});

twilioRequestHandler(app);
productsRequestHandler(app);
cartsProductsRequestHandler(app);
ordersRequestHandler(app, stripe);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
