const playersRouter = require("express").Router();
const { getPlayerById, updatePlayerProgress } = require("../controllers/players");

//playersRouter.route('').post(createplayer);

playersRouter.route('/:playerId').get(getPlayerById).patch(updatePlayerProgress);



module.exports = playersRouter;
