/* eslint-disable no-undef */
// pm2 start 5(vps) , pm2 start 0(local)
const { app } = require("../index.js");

const {getUser} = require('../controler/userControler');
//app.get("/", (req, res) => {
//  res.send({
//    cc: "hello",
//  });
//});

app.get("user",getUser);
