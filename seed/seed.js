const db = require("../firestore");

const seedDB = ({
  trailData,
  townHallData,
  libraryData,
  chinatownData,
  johnBrightData,
  stAnnData,
  adminData
}) => {
  const batch = db.batch();

  const adminRef = db.collection('admins').doc('admin01');
  batch.set(adminRef, adminData)

  const trailRef = db.collection("trails").doc("manchester-city-trail");
  batch.set(trailRef, trailData);

  const townHallRef = db.collection("challenges").doc("manc-town-hall");
  batch.set(townHallRef, townHallData);

  const libraryRef = db.collection("challenges").doc("library");
  batch.set(libraryRef, libraryData);

  const chinaTownRef = db.collection("challenges").doc("chinaTown");
  batch.set(chinaTownRef, chinatownData);

  const johnBrightRef = db.collection("challenges").doc("johnBright");
  batch.set(johnBrightRef, johnBrightData);

  const stAnnRef = db.collection("challenges").doc("stAnn");
  batch.set(stAnnRef, stAnnData);

  return batch.commit().then(() => console.log("seeded"));
};
module.exports = seedDB;
