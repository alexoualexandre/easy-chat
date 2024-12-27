// eslint-disable-next-line no-undef
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "alexandre",
  password: "michiels",
  database: "easy",
});

// eslint-disable-next-line no-undef
module.exports = { connection };
