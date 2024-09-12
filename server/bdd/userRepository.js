// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class User {
  async select() {
    const [r] = await connection.query("SELECT * FROM user");
    return r;
  }

  async addUser(data) {
    const [add] = await connection.query(
      "INSERT INTO user (ip,sex,search,age,pseudo,mail,password) value (?,?,?,?,?,?,?)",
      [
        data.ip,
        data.sex,
        data.search,
        parseInt(data.age, 10),
        data.pseudo,
        data.mail,
        data.password,
      ]
    );

    return add.insertId;
  }
}

// eslint-disable-next-line no-undef
module.exports = { User };
