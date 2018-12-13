const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./routers/api");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

app.use("/api", express.static("public"));

app.use("/api", apiRouter);

module.exports = app;
