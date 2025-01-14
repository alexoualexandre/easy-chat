// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class AlertMailRepository {
  async alertMail(id, dest) {
    const [results] = await connection.query(
      "SELECT * FROM mail_alert WHERE from_id = ? AND to_id = ?",
      [parseInt(id, 10), parseInt(dest, 10)]
    );
    return results;
  }

  async addAlert(data) {
    await connection.query(
      "INSERT INTO mail_alert (from_id,to_id,open) VALUES (?,?,?)",
      [
        parseInt(data.user_alerted, 10),
        parseInt(data.user_selected, 10),
        parseInt(data.open, 10),
      ]
    );
  }

  async dropAlert(data) {
    await connection.query(
      "DELETE FROM mail_alert WHERE from_id = ? AND to_id = ?",
      [parseInt(data.user_alerted, 10), parseInt(data.user_selected, 10)]
    );
  }
}

// eslint-disable-next-line no-undef
module.exports = { AlertMailRepository };
