const express = require('express');
const {
  addOrder,
  retrieveLastOrder,
  addOrderProduct,
} = require('./database.cjs');
const { retrieveCartItemsId } = require('../util/cart-helper.cjs');

const endpointSecret = process.env.VITE_STRIPE_ENDPOINT_SECRET;
const HOST_PATH = 'https://we-bloom.onrender.com';
const API_PATH = '/api/v1/checkout';

const ordersRequestHandler = (app, stripe) => {
  app.post(`${API_PATH}/create-checkout-session`, async (req, res) => {
    const { cartItems } = req.body;
    const cartItemsId = retrieveCartItemsId(cartItems);
    const customer_id = 1;

    const customer = await stripe.customers.create({
      metadata: {
        customerId: customer_id,
        cart: JSON.stringify(cartItemsId),
      },
    });

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
      customer: customer.id,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${HOST_PATH}/success`,
      cancel_url: `${HOST_PATH}/cart`,
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
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      if (event.type === 'payment_intent.succeeded') {
        const data = event.data.object;
        const { amount, currency, payment_method, status, created, customer } =
          data;

        try {
          const user = await stripe.customers.retrieve(customer);
          const paymentMethod = await stripe.paymentMethods.retrieve(
            payment_method
          );
          const amountInDollars = amount / 100;

          const { cart, customerId } = user.metadata;

          if (paymentMethod && customerId) {
            const orderId = await addOrder(
              amountInDollars,
              currency,
              paymentMethod.type,
              status,
              created,
              customerId
            );

            if (orderId) {
              await addOrderProduct(orderId, JSON.parse(cart), customerId);
            }
          }

          res.send();
        } catch (e) {
          console.error('Error in payment intent', e);
        }
      }
    }
  );

  app.get(`${API_PATH}/get-order-details`, async (req, res) => {
    try {
      const orderDetails = await retrieveLastOrder(1);
      if (orderDetails) {
        res.status(200).send(orderDetails);
      } else {
        res.status(404).send({ error: `Order not found` });
      }
    } catch (e) {
      console.error('Error retrieving last order details', e);
    }
  });
};

module.exports = { ordersRequestHandler };
