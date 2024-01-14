const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.VITE_BASE_API_URL,
  user: process.env.VITE_MY_SQL_USER,
  password: process.env.VITE_MY_SQL_PASSWORD,
  database: process.env.VITE_MY_SQL_DATABASE,
});

const productsRequestHandler = (app) => {
  app.get('/products', (req, res) => {
    const q = 'SELECT * FROM products';
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
};

module.exports = { productsRequestHandler };
