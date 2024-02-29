const { db } = require('../databse.cjs');

const getCartProducts = async () => {
  const q = `SELECT * FROM cart_products`;

  const [rows] = await db.query(q);
  return rows;
};

module.exports = { getCartProducts };
