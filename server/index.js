/* eslint-disable no-undef */

const express = require("express");
const path = require("path");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const app = express();

// 🔐 Lecture des certificats SSL
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/easy-chat.org/privkey.pem"),       // Chemin vers ta clé privée
  cert: fs.readFileSync("/etc/letsencrypt/live/easy-chat.org/cert.pem")      // Chemin vers ton certificat
};

app.use(express.json());

// ✅ Configuration CORS
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

// 📁 Fichiers statiques
app.use("/upload", express.static(path.join(__dirname, "/upload")));

// ✅ Démarrage du serveur HTTPS
https.createServer(sslOptions, app).listen(3311, () => {
  console.log("Serveur HTTPS démarré sur le port 3311");
});

module.exports = { app };

