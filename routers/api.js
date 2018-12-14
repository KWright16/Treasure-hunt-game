const apiRouter = require("express").Router();
const trailsRouter = require("./trails");
const gamesRouter = require('./games');
const locactionsRouter = require('./locations');
const playersRouter = require('./players');
const adminRouter = require('./admin');

apiRouter.use("/trails", trailsRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use('/locations', locactionsRouter);
apiRouter.use('/players', playersRouter);
apiRouter.use('/admins', adminRouter);


module.exports = apiRouter;
