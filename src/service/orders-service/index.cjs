const express = require('express');

const endpointSecret = process.env.VITE_STRIPE_ENDPOINT_SECRET_LOCAL;
const API_PATH = '/api/v1/checkout';

const ordersRequestHandler = (app, stripe) => {
  app.post(`${API_PATH}/create-checkout-session`, async (req, res) => {
    const { cartItems } = req.body;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'sgd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/cart',
    });

    res.json({ url: session.url });
  });

  app.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      const sig = req.headers['stripe-signature'];
      const payload = req.rawBody || req.body;

      let event;

      try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        console.log('Webhook verification successful');
      } catch (err) {
        console.log('Webhook verification failed', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 res to acknowledge receipt of the event
      res.send();
    }
  );
};

module.exports = { ordersRequestHandler };
