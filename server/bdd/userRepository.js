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
      "INSERT INTO user (ip,sex,search,age,pseudo,mail,password,dep,img,description,inline) value (?,?,?,?,?,?,?,?,?,?,?)",
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
        1,
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
    const [r] = await connection.query(
      "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user ORDER BY id DESC"
    );
    return r;
  }

  async modifyImgProfile(nv, id) {
    await connection.query("UPDATE user SET img = ? WHERE id = ?", [nv, id]);
    await connection.query("INSERT INTO album (id_user,nom) VALUE (?,?)", [id, nv]);
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

  async disconnect(id) {
    await connection.query("UPDATE user SET inline = 0 WHERE id = ?", [id]);
  }

  async updateInline(id) {
    await connection.query("UPDATE user SET inline = 1 WHERE id = ?", [id]);
  }

  async recherche(data) {
    if (
      typeof data.search !== "object" &&
      typeof data.inline === "object" &&
      typeof data.dep === "object"
    ) {
      const [r] = await connection.query(
        "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE sex = ? AND age >= ? AND age <= ? order by id desc",
        [data.search, parseInt(data.min, 10), parseInt(data.max, 10)]
      );
      return r;
    }

    if (
      typeof data.search === "object" &&
      typeof data.inline !== "object" &&
      typeof data.dep === "object"
    ) {
      const [r] = await connection.query(
        "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE age >= ? AND age <= ? AND inline = ? order by id desc",
        [
          parseInt(data.min, 10),
          parseInt(data.max, 10),
          parseInt(data.inline, 10),
        ]
      );
      return r;
    }

    if (
      typeof data.search === "object" &&
      typeof data.inline === "object" &&
      typeof data.dep !== "object"
    ) {
      const [r] = await connection.query(
        "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE age >= ? AND age <= ? AND dep = ? order by id desc",
        [
          parseInt(data.min, 10),
          parseInt(data.max, 10),
          parseInt(data.dep.split("-")[0], 10),
        ]
      );
      return r;
    }

    if (
      typeof data.search !== "object" &&
      typeof data.inline !== "object" &&
      typeof data.dep === "object"
    ) {
      const [r] = await connection.query(
        "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE sex = ? AND age >= ? AND age <= ? AND inline = ? order by id desc",
        [
          data.search,
          parseInt(data.min, 10),
          parseInt(data.max, 10),
          parseInt(data.inline, 10),
        ]
      );
      return r;
    }

    if (
      typeof data.search !== "object" &&
      typeof data.inline === "object" &&
      typeof data.dep !== "object"
    ) {
      const [r] = await connection.query(
        "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE sex = ? AND age >= ? AND age <= ? AND dep = ? order by id desc",
        [
          data.search,
          parseInt(data.min, 10),
          parseInt(data.max, 10),
          parseInt(data.dep.split("-")[0], 10),
        ]
      );
      return r;
    }

    if (
      typeof data.search === "object" &&
      typeof data.inline !== "object" &&
      typeof data.dep !== "object"
    ) {
      const [r] = await connection.query(
        "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE age >= ? AND age <= ? AND dep = ? AND inline = ? order by id desc",
        [
          parseInt(data.min, 10),
          parseInt(data.max, 10),
          parseInt(data.dep.split("-")[0], 10),
          parseInt(data.inline, 10),
        ]
      );
      return r;
    }

    if (
      typeof data.search === "object" &&
      typeof data.inline === "object" &&
      typeof data.dep === "object"
    ) {
      const [r] = await connection.query(
        "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE age >= ? AND age <= ? order by id desc",
        [parseInt(data.min, 10), parseInt(data.max, 10)]
      );
      return r;
    }

    const [r] = await connection.query(
      "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE sex = ? AND age >= ? AND age <= ? AND dep = ? AND inline = ? order by id desc",
      [
        data.search,
        parseInt(data.min, 10),
        parseInt(data.max, 10),
        parseInt(data.dep.split("-")[0], 10),
        parseInt(data.inline, 10),
      ]
    );
    return r;
  }

  async userSelected(id) {
    const [userId] = await connection.query(
      "SELECT id,sex,search,age,pseudo,created_at,dep,img,description,inline FROM user WHERE id = ?",
      [id]
    );
    return userId;
  }
}

// eslint-disable-next-line no-undef
module.exports = { User };
