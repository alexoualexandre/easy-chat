/* eslint-disable no-undef */

const express = require("express");

const path = require("path");

const cors = require("cors");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = ["http://localhost:5173", "http://easy-chat.org"];
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

app.listen("3311");

module.exports = { app };
