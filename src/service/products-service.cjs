const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost' || process.env.VITE_BASE_API_URL,
  port: 3306,
  user: process.env.VITE_MY_SQL_USER,
  password: process.env.VITE_MY_SQL_PASSWORD,
  database: process.env.VITE_MY_SQL_DATABASE,
});

const productsRequestHandler = (app) => {
  app.get('/api/v1/products/all', (req, res) => {
    const q = 'SELECT * FROM products';
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
};

module.exports = { productsRequestHandler };
