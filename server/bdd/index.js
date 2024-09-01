// eslint-disable-next-line no-undef
require('dotenv').config();

// eslint-disable-next-line no-undef
const mysql = require("mysql2/promise");
// eslint-disable-next-line no-undef

const connection = mysql.createPool({
  host: "localhost",
  user: "alexandre",
  password: process.env.PASSWORD,
  database: "easy",
});

// eslint-disable-next-line no-undef
module.exports = { connection };
