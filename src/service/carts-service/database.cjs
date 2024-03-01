const { db } = require('../databse.cjs');

const getCartProducts = async () => {
  const q = `SELECT * FROM carts_products`;

  const [rows] = await db.query(q);
  return rows;
};

const addCartProduct = async (productId, price) => {
  const q = `INSERT INTO carts_products (cart_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)`;
  const values = [1, productId, 1, price];

  try {
    const [result] = await db.query(q, values);
    return await getCartProducts();
  } catch (e) {
    console.error('Error adding item to carts_products in database', e);
  }
};

const updateCartProducts = async (productId, quantity, totalPrice) => {
  const q = `UPDATE carts_products SET quantity = ?, total_price = ? WHERE product_id = ?`;

  try {
    const [rows] = await db.query(q, [quantity, totalPrice, productId]);
    return await getCartProducts();
  } catch (e) {
    console.error('Error updating carts_products in database', e);
  }
};

module.exports = { getCartProducts, addCartProduct, updateCartProducts };
