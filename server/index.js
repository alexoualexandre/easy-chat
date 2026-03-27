/* eslint-disable no-undef */

const express = require("express");
const path = require("path");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const Stripe = require("stripe");

const app = express();

// 🔐 Lecture des certificats SSL
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/easy-chat.org/privkey.pem"), // Chemin vers ta clé privée
  cert: fs.readFileSync("/etc/letsencrypt/live/easy-chat.org/cert.pem"), // Chemin vers ton certificat
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

app.use(express.raw({ type: "application/json" }));

const stripe = new Stripe(
  "pk_test_51RISJGCpveUZBSxnb999s3T4RoIIynlm6UgxaD74xmqnvFLdptvHs9JRQa4tN3IJmFmYm2lS6pLqBS6kUkev4ZDL00SwEoWICR",
);

const endpointSecret = "whsec_1x9sRlSPxbCbLRhR4ahrE4OSwX52S5U1";

app.post("/stripe", (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log("❌ Signature invalide :", err.message);
    return res.sendStatus(400);
  }

  // 🎯 Gestion des événements
  switch (event.type) {
    case "payment_intent.succeeded":
      paymentIntent = event.data.object;
      console.log("✅ Paiement réussi :", paymentIntent.id);
      break;

    case "payment_intent.payment_failed":
      console.log("❌ Paiement échoué");
      break;

    case "checkout.session.completed":
      console.log("🛒 Paiement checkout terminé");
      break;

    default:
      console.log(`🔔 Événement reçu : ${event.type}`);
  }

  res.sendStatus(200);
});

// ✅ Démarrage du serveur HTTPS
https.createServer(sslOptions, app).listen(3311, () => {
  console.log("Serveur HTTPS démarré sur le port 3311");
});

module.exports = { app };
