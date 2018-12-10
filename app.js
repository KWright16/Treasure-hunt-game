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

// db.collection("routes")
//   .add({
//     name: "Route 1",
//     locations: []
//   })
//   .catch(error => {
//     console.log(error);
//   });
//   .then(ref => {
//     console.log(ref.path, "<<<<<<<<<");
//   });
// const route1 = db.collection("routes").doc("2hvg8gDPQd9HGkSZCXik");

// route1
//   .update({
//     location: admin.firestore.FieldValue.arrayUnion(3),
//     location: admin.firestore.FieldValue.arrayRemove(2)
//   })
//   .then(() => {
//     return db.collection("routes").get();
//   })
//   .then(routes => {
//     routes.forEach(route => {
//       console.log(route.id, route.data(), "<<<<<<<<");
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });

const route2 = db.collection("routes").doc("route2");
route2.set({
  count: 1
});

const transaction = db
  .runTransaction(t => {
    return t.get(route2).then(doc => {
      const newCount = doc.data().count + 1;
      if (newCount <= 5) {
        t.update(route2, { count: newCount });
        return Promise.resolve("Count increased to " + newCount);
      } else {
        return Promise.reject("Sorry! Count is too big.");
      }
    });
  })
  .then(result => {
    console.log("Transaction success", result);
  })
  .catch(err => {
    console.log("Transaction failure:", err);
  });

//   // Get a new write batch
// var batch = db.batch();

// // Set the value of 'NYC'
// var nycRef = db.collection('cities').doc('NYC');
// batch.set(nycRef, {name: 'New York City'});

// // Update the population of 'SF'
// var sfRef = db.collection('cities').doc('SF');
// batch.update(sfRef, {population: 1000000});

// // Delete the city 'LA'
// var laRef = db.collection('cities').doc('LA');
// batch.delete(laRef);

// // Commit the batch
// return batch.commit().then(function () {
//   // ...
// });

module.exports = app;
