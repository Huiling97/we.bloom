const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const accountSid = process.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = process.env.VITE_TWILIO_AUTH_TOKEN;
const verifySid = process.env.VITE_TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid, authToken);

const twilioRequestHandler = (app) => {
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
};

module.exports = { twilioRequestHandler };
