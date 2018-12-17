process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const db = require("../firestore");
const seedDB = require("../seed/seed");
const testData = require("../seed/testData/index");
const dropDatabase = require("./dropDatabase");
const {
  trailData,
  townHallData,
  libraryData
} = require("../seed/testData/index");

describe("/api", () => {
  beforeEach(() => {
    // dropDatabase(db, "locations");
    // dropDatabase(db, "trails");
    return dropDatabase(db, "games").then(() => {
      return seedDB(testData);
    });
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
          expect(trails[0].route.length).to.equal(trailData.route.length);
        });
    });
    it("GET /trials/:trailId returns status 200 and the requested trail", () => {
      return request
        .get("/api/trails/manchester-city-trail")
        .expect(200)
        .then(({ body: { trail } }) => {
          expect(trail.route.length).to.equal(trailData.route.length);
          expect(trail.name).to.equal(trailData.name);
        });
    });
    // describe("/players", () => {
    //   it("GET returns status 200 and an array of all the players", () => {
    //     return request
    //       .get("/api/players")
    //       .expect(200)
    //       .then(({ body: { players } }) => {
    //         console.log(players);
    //         // expect(trail.route.length).to.equal(trailData.route.length);
    //         // expect(trail.name).to.equal(trailData.name);
    //       });
    //   });
    // });
    describe("/games", () => {
      it("POST returns status 200 and the requested game", () => {
        const newGame = {
          gameName: "New game",
          trailId: "manchester-city-trail",
          noOfPlayers: 3
        };
        return request
          .post("/api/games")
          .send(newGame)
          .expect(201)
          .then(
            ({
              body: { gameName, gamePin, trailId, noOfPlayers, playersArray }
            }) => {
              expect(gameName).to.equal(newGame.gameName);
            }
          );
      });
      // it("GET returns status 200 and the requested game", () => {
      //   return request
      //     .get("/api/games")
      //     .expect(200)
      //     .then(({ body: { game } }) => {
      //       // expect(trails[0].route.length).to.equal(trailData.route.length);
      //     });
      // });
    });
  });
});
