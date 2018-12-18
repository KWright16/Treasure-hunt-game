const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./routers/api");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

app.use("/api", express.static("public"));

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
  if (err.name === "CastError") err.status = 400;
  res.status(err.status).send({ msg: err.msg || "Bad Request" });
  next(err);
});

app.use((err, req, res, next) => {
  if (err instanceof QueryResultError && err.code === noData) {
    res.status(404).send({ msg: "Page Not Found" });
  }
  next(err);
});

module.exports = app;
