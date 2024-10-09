// eslint-disable-next-line no-undef
const argon2 = require("argon2");
const argon = async (req, res, next) => {
  if (req.body.password.charAt(0) !== "$") {
    const hash = await argon2.hash(req.body.password);
    delete req.body.password;
    req.body.password = hash;
  }
  next();
};

// eslint-disable-next-line no-undef
module.exports = { argon };
