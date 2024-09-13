
const argon2 = require('argon2');
const argon = async (req,res,next)=>{
  const hash = await argon2.hash(req.body.password);



delete req.body.password;
req.body.password=hash;
  next();
}


module.exports = {argon};
