const admin = require("firebase-admin");

const serviceAccount = require("../treasure-hunt.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://treasure-hunt-dcd8e.firebaseio.com"
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

exports.getTrails = (req, res, next) => {
  db.collection("trails")
    .get()
    .then(trails => {
      const trailsArray = [];
      trails.forEach(trail => {
        console.log(trail.id, trail.data(), "<<<<<<<<");
        trailsArray.push({ ...trail.data(), id: trail.id });
      });
      return trailsArray;
    })
    .then(trailsArray => {
      console.log(trailsArray);
      res.status(200).send({ trailsArray });
    })
    .catch(error => {
      console.log(error);
    });
};
