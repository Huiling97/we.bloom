const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const express = require('express');
const cors = require('cors');
const app = express();

const accountSid = process.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = process.env.VITE_TWILIO_AUTH_TOKEN;
const verifySid = process.env.VITE_TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid, authToken);

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

app.get('/sendCode', (req, res) => {
  client.verify.v2
    .services(verifySid)
    .verifications.create({ to: `+65${req.query.phone}`, channel: 'sms' })
    .then((verification) => {
      res.status(200).send({
        message: 'Verification sent',
        phone: req.query.phone,
        data: verification,
      });
    });
});

app.get('/verifyCode', (req, res) => {
  client.verify.v2
    .services(verifySid)
    .verificationChecks.create({
      to: `+65${req.query.phone}`,
      code: `${req.query.code}`,
    })
    .then((verification_check) => {
      if (verification_check.status === 'approved') {
        res.status(200).send({
          message: 'Valid OTP',
          data: verification_check,
        });
      } else {
        res.status(400).send({
          message: 'Invalid OTP',
          data: verification_check,
        });
      }
    });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
