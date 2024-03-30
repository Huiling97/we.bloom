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

module.exports = { db };
