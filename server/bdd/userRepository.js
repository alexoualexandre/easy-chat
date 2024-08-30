const {connection} = require('./index.js');

class User{
async select  
(){

const [r] = await connection.query('SELECT * FROM user'
);
return r
}
}

module.exports = {User};



