// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class User {
  async selectUser(pseudo) {
    const [r] = await connection.query(
      "SELECT pseudo FROM user WHERE pseudo = ?",
      [pseudo]
    );
    return r;
  }

  async addUser(data) {
    const [add] = await connection.query(
      "INSERT INTO user (ip,sex,search,age,pseudo,mail,password,dep) value (?,?,?,?,?,?,?,?)",
      [
        data.ip,
        data.sex,
        data.search,
        parseInt(data.age, 10),
        data.pseudo,
        data.mail,
        data.password,
        parseInt(data.dep.split('-')[0],10)
      ]
    );

    return add.insertId;
  }
}

// eslint-disable-next-line no-undef
module.exports = { User };
