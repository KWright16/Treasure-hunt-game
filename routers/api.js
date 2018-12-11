const apiRouter = require("express").Router();
const trailsRouter = require("./trails");
const gamesRouter = require('./games');
const locactionsRouter = require('./locations');
const playersRouter = require('./players');

apiRouter.use("/trails", trailsRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use('/locations', locactionsRouter);
apiRouter.use('/players', playersRouter)


module.exports = apiRouter;
