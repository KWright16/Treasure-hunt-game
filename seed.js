const admin = require("firebase-admin");
const serviceAccount = require("./treasure-hunt.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://treasure-hunt-dcd8e.firebaseio.com"
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const batch = db.batch();
const trailRef = db.collection("trails").doc("city-trail");

batch.set(trailRef, {
  name: "City Trail",
  duration: "45 mins",
  region: { lat: 53.4808, long: -2.2426 },
  routeRef:
    "projects/Tresure-hunt/databases/treasure-hunt-dcd8e/documents/routes/city-trail-route-1"
});

const cityRouteRef = db.collection("routes").doc("city-trail-route-1");
batch.set(cityRouteRef, {
  locations: [
    {
      locationRef:
        "projects/Tresure-hunt/databases/treasure-hunt-dcd8e/documents/locations/manc-town-hall",
      lat: 53.4781,
      long: -2.2441,
      name: "Manchester Town Hall"
    },
    {
      locationRef:
        "projects/Tresure-hunt/databases/treasure-hunt-dcd8e/documents/locations/library",
      lat: 53.4781,
      long: -2.2447,
      name: "Manchester Central Library"
    },
    {
      locationRef:
        "projects/Tresure-hunt/databases/treasure-hunt-dcd8e/documents/locations/chinaTown",
      lat: 53.4784,
      long: -2.2399,
      name: "Chinatown Arch"
    },
    {
      locationRef:
        "projects/Tresure-hunt/databases/treasure-hunt-dcd8e/documents/locations/johnBright",
      lat: 53.6146,
      long: -2.1623,
      name: "John Bright Statue"
    },
    {
      locationRef:
        "projects/Tresure-hunt/databases/treasure-hunt-dcd8e/documents/locations/stAnn",
      lat: 53.4817,
      long: -2.2458,
      name: "St Ann's Church"
    }
  ]
});

const townHallRef = db.collection("locations").doc("manc-town-hall");
batch.set(townHallRef, {
  challengeType: "question",
  challenge:
    "I have 2 hands on my face; you check on me to keep your pace? (one word) ",
  answer: "clock"
});

const libraryRef = db.collection("locations").doc("library");
batch.set(libraryRef, {
  challengeType: "question",
  challenge: "How many pillars are there?",
  answer: 6
});

const chinaTownRef = db.collection("locations").doc("chinaTown");
batch.set(chinaTownRef, {
  challengeType: "question",
  challenge: "What street is the Arch on?",
  answer: "Faulkner Street"
});

const johnBrightRef = db.collection("locations").doc("johnBright");
batch.set(johnBrightRef, {
  challengeType: "image",
  challenge: "Take a picture of John Bright Statue",
  analysis: {
    statue: 0.99,
    sculpture: 0.96,
    monument: 0.96,
    memorial: 0.89,
    landmark: 0.94
  },
  answer: null
});

const stAnnRef = db.collection("locations").doc("stAnn");
batch.set(stAnnRef, {
  challengeType: "question",
  challenge: "What year was the church built?",
  answer: 1712
});

return batch.commit().then(() => console.log("seeded"));
