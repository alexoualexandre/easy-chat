// eslint-disable-next-line no-undef
const { User } = require("../bdd/userRepository.js");

const getUser = async (req, res, next) => {
  try {
    const user = await new User().select();
    res.json(user);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const insertUser = async (req, res, next) => {
  try {
    const insert = await new User().addUser(req.body);
    res.json({ nb_user: insert });
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line no-undef
module.exports = { getUser, insertUser };
