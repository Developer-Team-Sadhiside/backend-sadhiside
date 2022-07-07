require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("../config/routes");
const cors = require("cors");

const publicDir = path.join(__dirname, "../public");
const app = express();

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Set Public Directory */
app.use(express.static(publicDir));

/** Install Router */
app.use(router);

app.use(cors())

module.exports = app;