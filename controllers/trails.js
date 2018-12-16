const db = require("../firestore");

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
    .then(trails => {
      res.status(200).send({ trails });
    })
    .catch(next);
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
    .catch(next);
};
