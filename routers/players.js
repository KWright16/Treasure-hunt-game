const playersRouter = require("express").Router();
const { getPlayers, addPlayersToLeaderboard } = require("../controllers/players");

playersRouter.route('').get( getPlayers);

playersRouter.route('/:gamePin').post( addPlayersToLeaderboard )



module.exports = playersRouter;
