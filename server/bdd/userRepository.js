const {connection} = require('./index.js');

class User{
co1  
(arg){
connection.query('SELECT * FROM user_data WHERE id = ?',[arg],
function(err,results,field){
console.log(results);
console.log(field);
	}
    )
  }
}

const t = new User()
t.co1(22);



