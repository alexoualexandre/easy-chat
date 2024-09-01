// eslint-disable-next-line no-undef
require("dotenv").config();
const { PASSWORD } = process.env;
// eslint-disable-next-line no-undef
const mysql = require("mysql2/promise");
// eslint-disable-next-line no-undef

const connection = mysql.createPool({
  host: "localhost",
  user: "alexandre",
  password: PASSWORD,
  database: "easy",
});

// eslint-disable-next-line no-undef
module.exports = { connection };
