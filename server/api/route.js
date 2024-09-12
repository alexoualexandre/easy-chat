/* eslint-disable no-undef */
// pm2 start 6(vps) , pm2 start 0(local)
const { app } = require("../index.js");

const { getUser,insertUser } = require("../controler/userControler.js");

// pm2 resurrect

// app.get("/", (req, res) => {
//   res.send({
//     cc: "hello",
//   });
// });

app.get("/user", getUser);

app.post("/insert-user", insertUser);
