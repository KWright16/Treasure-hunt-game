const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./routers/api");
// const { credential, databaseURL } = require("./config");
// const admin = require("firebase-admin");
// // const firebase = require("firebase");

// const serviceAccount = require("./treasure-hunt.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://treasure-hunt-dcd8e.firebaseio.com"
// });

// const db = admin.firestore();
// db.settings({ timestampsInSnapshots: true });

app.use(bodyParser.json());

app.use("/api", apiRouter);

module.exports = { app };
