const { db } = require('../databse.cjs');

const getCartProducts = async () => {
  const q = `SELECT cp.quantity, cp.total_price, p.* 
              FROM carts_products cp
              JOIN products p ON cp.product_id = p.id
              WHERE cp.cart_id = 1`;

  try {
    const [rows] = await db.query(q);
    const cartProducts = rows.map((item) => ({
      ...item,
      total_price: parseFloat(item.total_price),
    }));

    return cartProducts;
  } catch (e) {
    console.error('Error fetching cart products', e);
  }
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

const deleteCartProduct = async (productId) => {
  const q = `DELETE FROM carts_products WHERE product_id = ?`;

  try {
    await db.query(q, [productId]);
    return await getCartProducts();
  } catch (e) {
    console.error(`Error deleting product ${productId} from cart`, e);
  }
};

module.exports = {
  getCartProducts,
  addCartProduct,
  updateCartProducts,
  deleteCartProduct,
};
