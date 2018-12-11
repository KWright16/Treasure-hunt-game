const seedDB = require("./seed");
const db = require("../firestore");
const rawData =
  process.env.NODE_ENV === "test"
    ? require("./testData/index")
    : require("./devData/index");

seedDB(rawData);
