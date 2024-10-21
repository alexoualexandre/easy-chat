// eslint-disable-next-line no-undef
const { Message } = require("../bdd/messageRepository.js");

const addMessage = async (req, res, next) => {
  const data = req.body;
  try {
    await new Message().addMessage(data);
    res.json({ add: "ok" });
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const getMessage = async (req, res, next) => {
  const { id, auth } = req.params;
  try {
    const data = await new Message().getMessage({ id: id, auth: auth });
    res.json(data);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

// eslint-disable-next-line no-undef
module.exports = { addMessage, getMessage };
