const { db } = require('../database.cjs');

const getProducts = async () => {
  const q = 'SELECT * FROM products';

  const [rows] = await db.query(q);
  return rows;
};

const getProduct = async (id) => {
  const q = 'SELECT * FROM products WHERE id = ?';

  try {
    const [rows] = await db.query(q, [id]);
    return rows[0];
  } catch (e) {
    console.error('Error retrieving product from database', e);
  }
};

const addProduct = async (
  brand,
  category,
  name,
  price,
  size,
  details,
  usage,
  ingredients
) => {
  const q = `INSERT INTO products (brand, category, name, price, size, details, \`usage\`, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    brand,
    category,
    name,
    price,
    size,
    details,
    usage,
    ingredients,
  ];

  const [result] = await db.query(q, values);
  const id = result.insertId;
  return getProduct(id);
};

const editProduct = async (
  brand,
  category,
  name,
  price,
  size,
  details,
  usage,
  ingredients,
  productId
) => {
  const q =
    'UPDATE products SET brand = ?, category = ?, name = ?, price = ?, size = ?, details = ?, `usage` = ?, ingredients = ? WHERE id = ?';
  const values = [
    brand,
    category,
    name,
    price,
    size,
    details,
    usage,
    ingredients,
  ];

  try {
    const [rows] = await db.query(q, [...values, productId]);
    return await getProducts();
  } catch (e) {
    console.error('Error updating product in database', e);
  }
};

const deleteProduct = async (productId) => {
  const q = `DELETE FROM products WHERE id = ?`;

  await db.query(q, [productId]);
  const [rows] = await db.query(q, [productId]);
  return getProducts();
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
