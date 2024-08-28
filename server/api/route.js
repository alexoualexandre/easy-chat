// pm2 start 5
const {app,salope} = require('../index.js');

app.get("/",(req,res)=>{res.send({
cc:"hello"
})}
);
