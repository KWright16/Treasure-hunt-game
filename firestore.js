const config = require("./config");
const admin = require("firebase-admin");
// const DB_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.DB_URL
//     : require("./config");
const serviceAccount = process.env.treasure_hunt
  ? process.env.treasure_hunt
  : process.env.NODE_ENV === "test"
  ? require("./test.json")
  : require("./treasure-hunt.json");

const fullConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.config ? process.env.config : config
};

admin.initializeApp(fullConfig);

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

module.exports = db;
