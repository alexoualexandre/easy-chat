// eslint-disable-next-line no-undef
//const { User } = require("../bdd/userRepository.js");

const getUser = async (req,res,next)=>{
try{
//  const user = await new User().select();
  res.json({data: "hello"});
}catch(err){
next({"faute: ",err});
}
}

module.exports = {getUser};
