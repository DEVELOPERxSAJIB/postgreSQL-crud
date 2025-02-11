const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  database: "bookdb",
  password : "87654321"
});

module.exports = pool;
