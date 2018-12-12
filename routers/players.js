const playersRouter = require("express").Router();
const { getPlayerById } = require("../controllers/players");

//playersRouter.route('').post(createplayer);

playersRouter.route("/:playerId").get(getPlayerById);

module.exports = playersRouter;
