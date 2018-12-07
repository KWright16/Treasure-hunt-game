const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const { credential, databaseURL } = require("./config");
const admin = require("firebase-admin");
// const firebase = require("firebase");

app.use(bodyParser.json());

const serviceAccount = require("./treasure-hunt.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://treasure-hunt-dcd8e.firebaseio.com"
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
// const firestore = new Firestore();
//   const settings = {timestampsInSnapshots: true};
//   firestore.settings(settings);

// db.collection("routes")
//   .get()
//   .then(routes => {
//     routes.forEach(route => {
//       console.log(route.id, route.data(), "<<<<<<<<");
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });

db.collection("routes")
  .add({
    name: "Route 1",
    locations: []
  })
  .then(ref => {
    console.log(ref.routes);
  });

module.exports = app;
