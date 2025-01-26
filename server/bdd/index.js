/* eslint-disable no-undef */
const mysql = require("mysql2/promise");
const fs = require('fs')

const connection = mysql.createPool({
  host: "localhost",
  user: "alexandre",
  password: "Rkyl32623!",
  database: "easy",
  ssl: {
    // ca: fs.readFileSync('/chemin/vers/ca-cert.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/easy-chat.org-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/easy-chat.org-0001/cert.pem '),
}
});

// eslint-disable-next-line no-undef
module.exports = { connection };
