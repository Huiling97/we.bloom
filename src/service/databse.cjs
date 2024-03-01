const mysql = require('mysql2');

const db = mysql
  .createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.VITE_MY_SQL_USER,
    password: process.env.VITE_MY_SQL_PASSWORD,
    database: process.env.VITE_MY_SQL_DATABASE,
  })
  .promise();

module.exports = { db };
