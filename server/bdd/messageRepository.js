// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class Message {
  async addMessage(data) {
    await connection.query(
      "INSERT INTO message (exp,dest,message,addition,new) VALUES (?,?,?,?,?)",
      [
        parseInt(data.exp, 10),
        parseInt(data.dest, 10),
        data.message,
        data.addition,
        1,
      ]
    );
    // return userId;
  }

  async getMessage(data) {
    const [result] = await connection.query(
      "SELECT dest,exp,message,sex FROM message JOIN user ON message.exp = user.id WHERE addition = ?",
      [parseInt(data.id, 10) + parseInt(data.auth, 10)]
    );
    return result;
  }

  async countMessage(Auth) {
    const [count] = await connection.query(
      "SELECT COUNT(*) FROM message WHERE dest = ? AND new = 1",
      [Auth]
    );
    return count;
  }

  async getNewMessage(auth) {
    const [result] = await connection.query(
      "SELECT addition,created_at_message,dep,age,exp,img,inline,message,pseudo,search,sex FROM message JOIN user ON message.exp = user.id WHERE dest = ? AND new = 1",
      [auth]
    );
    return result;
  }

  async updateCountMessage(exp) {
    await connection.query("UPDATE message SET new = 0 WHERE exp = ?", [
      parseInt(exp, 10),
    ]);
    // return result;
  }
}

// eslint-disable-next-line no-undef
module.exports = { Message };
