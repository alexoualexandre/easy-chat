// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class Message {
  async updateCountMessage(u) {
    const resp = await connection.query(
      "UPDATE message SET new = 0 WHERE exp = ?",
      [parseInt(u.u, 10)]
    );
    return resp;
  }

  async addMessage(data) {
    await connection.query(
      "INSERT INTO message (exp,dest,message,addition,new) VALUES (?,?,?,?,?)",
      [
        parseInt(data.changeTxt.exp, 10),
        parseInt(data.changeTxt.dest, 10),
        data.changeTxt.message,
        data.changeTxt.addition,

        parseInt(data.connect, 10) !== parseInt(data.m, 10) ? 1 : 0,
      ]
    );
  }

  async getMessage(data) {
    const [result] = await connection.query(
      "SELECT dest,exp,message,sex,new FROM message JOIN user ON message.exp = user.id WHERE addition = ? AND (dest = ? OR exp = ?)",
      [
        parseInt(data.id, 10) + parseInt(data.auth, 10),
        parseInt(data.id, 10),
        parseInt(data.id, 10),
      ]
    );
    return result;
  }

  async countMessage(Auth) {
    const [count] = await connection.query(
      "SELECT COUNT(*) FROM message WHERE dest = ? AND new = 1",
      [Auth]
    );
    return count[0];
  }

  async getNewMessage(auth) {
    const [result] = await connection.query(
      "SELECT addition,created_at_message,dep,age,exp,img,inline,message,pseudo,search,sex FROM message JOIN user ON message.exp = user.id WHERE dest = ? AND new = 1",
      [auth]
    );
    return result;
  }

  async removeMessage(user) {
    await connection.query("DELETE FROM message WHERE exp = ?", [user]);
    await connection.query("DELETE FROM calendar WHERE user_id = ?", [user]);
    await connection.query("DELETE FROM user WHERE id = ?", [user]);
    await connection.query("DELETE FROM mail_alert WHERE from_id = ?", [user]);
  }
}

// eslint-disable-next-line no-undef
module.exports = { Message };
