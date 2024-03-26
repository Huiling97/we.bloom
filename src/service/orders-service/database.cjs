const { db } = require('../databse.cjs');

const addOrder = async (
  total_price,
  currency,
  payment_method,
  payment_status,
  created_at,
  user_id
) => {
  const q = `INSERT INTO orders (total_price, currency, payment_method, payment_status, created_at, user_id) VALUES (?, ?, ?, ?, FROM_UNIXTIME(?), ?)`;
  const values = [
    total_price,
    currency,
    payment_method,
    payment_status,
    created_at,
    user_id,
  ];

  try {
    const [result] = await db.query(q, values);
    const id = result.insertId;
    return id;
  } catch (e) {
    console.error('Error adding order to database', e);
  }
};

const addOrderProduct = async (order_id, cart, user_id) => {
  console.log('cart in add order product', cart);
  const q = `INSERT INTO orders_products (order_id, product_id, quantity, user_id) VALUES ?`;
  const values = cart.map((product) => {
    const { id, quantity } = product;
    return [order_id, id, quantity, user_id];
  });

  try {
    await db.query(q, [values]);
  } catch (e) {
    console.error('Error adding orders_products to database', e);
  }
};

module.exports = { addOrder, addOrderProduct };
