/* eslint-disable no-undef */

const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = ["http://localhost:5173", "https://easy-chat.org"];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(cors());

app.use("/upload", express.static(path.join(__dirname, "/upload")));

// Charger les certificats SSL
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/easy-chat.org/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/easy-chat.org/fullchain.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/easy-chat.org/chain.pem"), // Optionnel, si vous avez un fichier de chaîne de certificats séparé
};

// Créer un serveur HTTPS et l'écouter sur le port 3311
https.createServer(sslOptions, app).listen(3311, () => {
  console.log("Server is running on https://localhost:3311");
});

module.exports = { app };
