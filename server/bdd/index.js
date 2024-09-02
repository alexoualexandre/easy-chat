// eslint-disable-next-line no-undef
require('dotenv').config({ path: '/var/www/html/code/easy-chat/server/bdd/.env' });

const {HOST,NAME,PASSWORD,DATA} = process.env;

// eslint-disable-next-line no-undef

const mysql = require("mysql2/promise");
// eslint-disable-next-line no-undef

const connection = mysql.createPool({
  host: HOST,
  user: NAME,
  password: PASSWORD,
  database: DATA,
});

// eslint-disable-next-line no-undef
module.exports = { connection };
