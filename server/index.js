/* eslint-disable no-undef */

const express = require("express");

const path = require('path');

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use('/upload',express.static(path.join(__dirname,'/upload')));

app.listen(3311);

module.exports = { app };

