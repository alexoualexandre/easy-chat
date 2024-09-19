/* eslint-disable no-undef */
// pm2 start 6(vps) , pm2 start 0(local)
const { app } = require("../index.js");

const { getUser, insertUser, getUserConnexion } = require("../controler/userControler.js");

const { argon } = require("../service/argon2.js");

app.post('/connexion',getUserConnexion)

app.get("/get-user/:pseudo", getUser);

app.post("/insert-user", argon, insertUser);
