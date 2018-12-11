process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const db = require("../firestore");
const seedDB = require("../seed/seed");
const testData = require("../seed/testData/index");
const {
  trailData,
  townHallData,
  libraryData
} = require("../seed/testData/index");

describe("/api", () => {
  beforeEach(() => {
    return seedDB(testData).then(docs => {});
  });
  after(() => {
    console.log("done");
  });
  describe("/trails", () => {
    it("GET returns status 200 an array of all the trails", () => {
      return request
        .get("/api/trails")
        .expect(200)
        .then(({ body: { trails } }) => {
          console.log(trails[0].route);
          expect(trails[0].route.length).to.equal(trailData.route.length);
        });
    });
  });
});
