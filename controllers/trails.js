const db = require("../firestore");
// const admin = require("firebase-admin");

// const serviceAccount = require("../treasure-hunt.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://treasure-hunt-dcd8e.firebaseio.com"
// });

// const db = admin.firestore();
// db.settings({ timestampsInSnapshots: true });

exports.getTrails = (req, res, next) => {
  db.collection("trails")
    .get()
    .then(trails => {
      const trailsArray = [];
      trails.forEach(trail => {
        trailsArray.push({ ...trail.data(), id: trail.id });
      });
      return trailsArray;
    })
    .then(trailsArray => {
      res.status(200).send({ trailsArray });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getTrailById = (req, res, next) => {
  const { trailId } = req.params;

  db.collection("trails")
    .doc(trailId)
    .get()
    .then(trailDoc => {
      if (!trailDoc.exists) {
        res.status(404).send("No such trail");
      } else {
        const trail = trailDoc.data();
        res.status(200).send({ trail });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
