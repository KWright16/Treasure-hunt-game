process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const admin = require("firebase-admin");
const config = require("./config");

const serviceAccount = require("./test.json");
admin.initializeApp(config);

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
// const seedDB = require("../seed/seed");
// const testData = require("../seed/testData/index");

// describe("/api", () => {
//   beforeEach(() => {
//     return seedDB(testData).then(docs => {
//       [topicDocs, userDocs, articleDocs, commentDocs] = docs;
//     });
//   });
//   after(() => {
//     console.log("done");
//     return mongoose.disconnect();
//   });
//   describe("/topics", () => {
//     it("GET returns status 200 an array of all the topics", () => {
//       return request
//         .get("/api/topics")
//         .expect(200)
//         .then(({ body: { topics } }) => {
//           expect(topics.length).to.equal(topicDocs.length);
//           expect(topics[0].title).to.equal(topicDocs[0].title);
//           expect(topics[1].slug).to.equal(topicDocs[1].slug);
//         });
//     });
//   });
//   it("GET returns status 200 an array of all the articles for a topic", () => {
//     return request
//       .get(`/api/topics/${articleDocs[0].belongs_to}/articles`)
//       .expect(200)
//       .then(({ body: { articles } }) => {
//         expect(articles[0].title).to.equal(articleDocs[0].title);
//         expect(articles[0].body).to.equal(articleDocs[0].body);
//         expect(articles[0].comment_count).to.equal(2);
//       });
//   });
