// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class Message {
  async addMessage(data) {
    await connection.query(
      "INSERT INTO message (exp,dest,message,addition) VALUES (?,?,?,?)",
      [
        parseInt(data.exp, 10),
        parseInt(data.dest, 10),
        data.message,
        data.addition,
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
}

// eslint-disable-next-line no-undef
module.exports = { Message };
