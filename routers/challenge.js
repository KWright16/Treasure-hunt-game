const challengesRouter = require("express").Router();
const { getChallengeById } = require("../controllers/challenge");

challengesRouter.route("/:challengeId").get(getChallengeById);



module.exports = challengesRouter;
