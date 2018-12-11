const gamesRouter = require("express").Router();
const { createGame } = require("../controllers/games");

gamesRouter.route("").post(createGame);

module.exports = gamesRouter;
