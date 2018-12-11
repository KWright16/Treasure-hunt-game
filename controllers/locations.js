exports.getLocationsById = (req, res, next) => {
  const { locationId } = req.params;

  db.collection("trails")
    .doc(locationId)
    .get()
    .then(locationDoc => {
      if (!locationDoc.exists) {
        res.status(404).send("No such location");
      } else {
        const location = locationDoc.data();
        res.status(200).send({ location });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
