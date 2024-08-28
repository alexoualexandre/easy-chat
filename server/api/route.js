/* eslint-disable no-undef */
// pm2 start 5(vps) , pm2 start 0(local)
const { app } = require("../index.js");

app.get("/", (req, res) => {
  res.send({
    cc: "hello",
  });
});
