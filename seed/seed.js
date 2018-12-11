const db = require("../firestore");

const seedDB = ({
  trailData,
  townHallData,
  libraryData,
  chinatownData,
  johnBrightData,
  stAnnData
}) => {
  const batch = db.batch();

  const trailRef = db.collection("trails").doc("manchester-city-trail");
  batch.set(trailRef, trailData);

  const townHallRef = db.collection("locations").doc("manc-town-hall");
  batch.set(townHallRef, townHallData);

  const libraryRef = db.collection("locations").doc("library");
  batch.set(libraryRef, libraryData);

  const chinaTownRef = db.collection("locations").doc("chinaTown");
  batch.set(chinaTownRef, chinatownData);

  const johnBrightRef = db.collection("locations").doc("johnBright");
  batch.set(johnBrightRef, johnBrightData);

  const stAnnRef = db.collection("locations").doc("stAnn");
  batch.set(stAnnRef, stAnnData);

  return batch.commit().then(() => console.log("seeded"));
};
module.exports = seedDB;
