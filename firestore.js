const config = require("./config");
const admin = require("firebase-admin");

const serviceAccount = require("./treasure-hunt.json");
admin.initializeApp(config);

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

module.exports = db;
