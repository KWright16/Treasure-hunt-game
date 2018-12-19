const playersRouter = require("express").Router();
const { getPlayers, addPlayerToLeaderboard } = require("../controllers/players");

playersRouter.route('').get( getPlayers);

playersRouter.route('/:playerName').post( addPlayerToLeaderboard )



module.exports = playersRouter;
