/* eslint-disable no-undef */
const { connection } = require("./index.js");

class CalendarRepository {
  async addCalendar(data) {
    await connection.query("INSERT INTO calendar (user_id) VALUES (?)", [
      data.user,
    ]);
  }

  async selectDate(dest) {
    const [result] = await connection.query(
      "SELECT event_time FROM calendar WHERE user_id = ?",
      [parseInt(dest, 10)]
    );
    return result;
  }
}

module.exports = { CalendarRepository };
