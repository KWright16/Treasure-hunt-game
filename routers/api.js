const apiRouter = require("express").Router();
const trailsRouter = require("./trails");
const gamesRouter = require('./games');
const locactionsRouter = require('./locations');

apiRouter.use("/trails", trailsRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use('/locations', locactionsRouter);


module.exports = apiRouter;
