require('dotenv').config();

const psgreSQL = require('pg');
const { Pool } = psgreSQL;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log(" PostgreSQL connected successfully!"))
  .catch(err => console.error("Connection failed:", err));

module.exports = pool;

