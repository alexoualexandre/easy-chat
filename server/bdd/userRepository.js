// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class User {
  async select() {
    const [r] = await connection.query("SELECT * FROM user");
    return r;
  }
}

// eslint-disable-next-line no-undef
module.exports = { User };
