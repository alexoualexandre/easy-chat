// eslint-disable-next-line no-undef
const { User } = require("../bdd/userRepository.js");

const getUser = async (req, res, next) => {
  try {
    const user = await new User().select();
    res.json(user);
  } catch (err) {
    next({ faute: `erreur:${err}` });
  }
};
// eslint-disable-next-line no-undef
module.exports = { getUser };
