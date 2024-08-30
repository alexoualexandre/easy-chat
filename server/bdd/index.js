const mysql = require('mysql2/promise');

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'alexandre',
  password: 'Rkyl32623!',
  database: 'easy',
});

module.exports = {connection};
