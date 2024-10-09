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
      "INSERT INTO user (ip,sex,search,age,pseudo,mail,password,dep,img,description) value (?,?,?,?,?,?,?,?,?,?)",
      [
        data.ip,
        data.sex,
        data.search,
        parseInt(data.age, 10),
        data.pseudo,
        data.mail,
        data.password,
        parseInt(data.dep.split("-")[0], 10),
        "logo.png",
        "",
      ]
    );

    return add.insertId;
  }

  async selectUserConnexion(data) {
    const [r] = await connection.query(
      "SELECT id, pseudo, password FROM user WHERE pseudo = ?",
      [data.pseudo]
    );
    return r;
  }

  async selectAllUser() {
    const [r] = await connection.query("SELECT * FROM user ORDER BY id DESC");
    return r;
  }

  async modifyImgProfile(nv, id) {
    await connection.query("UPDATE user SET img = ? WHERE id = ?", [nv, id]);
  }

  async selectUserId(id) {
    const [userId] = await connection.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);
    return userId;
  }

  async modifyProfil(result) {
    await connection.query(
      "UPDATE user SET search = ?, mail = ?, password = ?, dep = ?, description = ? WHERE id = ?",
      [
        result.search,
        result.mail,
        result.password,
        parseInt(result.dep, 10),
        result.description,
        result.user,
      ]
    );
  }
}

// eslint-disable-next-line no-undef
module.exports = { User };
