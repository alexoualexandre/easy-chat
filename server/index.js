/* eslint-disable no-undef */

const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3311);

module.exports = { app, salope };
