/* eslint-disable no-undef */
const { CalendarRepository } = require("../bdd/CalendarRepository.js");

const addCalendar = async (req, res, next) => {
  const data = req.body;
  try {
    await new CalendarRepository().addCalendar(data);
    res.json({ add: "ok" });
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const selectDate = async (req, res, next) => {
  const { dest } = req.params;
  try {
    const data = await new CalendarRepository().selectDate(dest);
    res.json(data);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

module.exports = {
  addCalendar,
  selectDate,
};
