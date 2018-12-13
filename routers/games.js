const gamesRouter = require("express").Router();
const {
  createGame,
  removeGame,
  getGameByPin,
  addNewPlayer,
  updatePlayerProgress,
  analyseImage
} = require("../controllers/games");

gamesRouter.route("").post(createGame);

gamesRouter
  .route("/:gamePin")
  .delete(removeGame)
  .get(getGameByPin);

gamesRouter
  .route("/:gamePin/players")
  .post(addNewPlayer)
  .patch(updatePlayerProgress);

gamesRouter.route('/:gamePin/:playerName')
  .patch(analyseImage)

module.exports = gamesRouter;
