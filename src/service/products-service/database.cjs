const mysql = require('mysql2');

const db = mysql
  .createConnection({
    host: process.env.VITE_MY_SQL_AIVEN_HOST || 'localhost',
    port: process.env.VITE_MY_SQL_AIVEN_PORT || 3306,
    user: process.env.VITE_MY_SQL_AIVEN_USER || process.env.VITE_MY_SQL_USER,
    password:
      process.env.VITE_MY_SQL_AIVEN_PASSWORD ||
      process.env.VITE_MY_SQL_PASSWORD,
    database:
      process.env.VITE_MY_SQL_AIVEN_DATABASE ||
      process.env.VITE_MY_SQL_DATABASE,
  })
  .promise();

const getProducts = async () => {
  const q = 'SELECT * FROM products';

  const [rows] = await db.query(q);
  return rows;
};

const getProduct = async (id) => {
  const q = 'SELECT * FROM products WHERE id = ?';

  const [rows] = await db.query(q, [id]);
  return rows[0];
};

const addProduct = async (
  brand,
  category,
  name,
  price,
  size,
  details,
  how_to_use,
  ingredients
) => {
  const q = `INSERT INTO products (brand, category, name, price, size, details, how_to_use, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    brand,
    category,
    name,
    price,
    size,
    details,
    how_to_use,
    ingredients,
  ];

  const [result] = await db.query(q, values);
  const id = result.insertId;
  return getProduct(id);
};

const deleteProduct = async (productId) => {
  const q = `DELETE FROM products WHERE id = ?`;

  await db.query(q, [productId]);
  const [rows] = await db.query(q, [productId]);
  return getProducts();
};

module.exports = { getProducts, addProduct, deleteProduct };
