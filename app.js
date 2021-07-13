require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const routes = require("./api/routes");
const errorHandler = require("./api/middlewares/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);
app.use(errorHandler)

module.exports = app;
