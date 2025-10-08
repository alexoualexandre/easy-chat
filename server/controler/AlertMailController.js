/* eslint-disable no-undef */

const { AlertMailRepository } = require("../bdd/AlertMailRepository.js");

const alertMail = async (req, res, next) => {
  const { id, dest } = req.params;
  try {
    const result = await new AlertMailRepository().alertMail(id, dest);
    res.json(result);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const addAlert = async (req, res, next) => {
  const data = req.body;
  try {
    await new AlertMailRepository().addAlert(data);
    res.json({ add: "ok" });
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const dropAlert = async (req, res, next) => {
  const data = req.body;
  try {
    await new AlertMailRepository().dropAlert(data);
    res.json({ drop: "ok" });
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const ProcessAlertMailConnection = async (req, res, next) => {
  try {
    const data = await new AlertMailRepository().ProcessAlertMailConnection();
    res.json(data);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const ProcessAlertMailTo = async (req, res, next) => {
  try {
    const data = await new AlertMailRepository().ProcessAlertMailTo();
    res.json(data);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const ModifyProcessAlertMailPrevent = async (req, res, next) => {
  const data = req.body;
  try {
    await new AlertMailRepository().ModifyProcessAlertMailPrevent(data);
    res.json({ modify: "ok" });
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

module.exports = {
  alertMail,
  addAlert,
  dropAlert,
  ProcessAlertMailConnection,
  ProcessAlertMailTo,
  ModifyProcessAlertMailPrevent,
};
