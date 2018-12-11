const apiRouter = require("express").Router();
const trailsRouter = require("./trails");

apiRouter.use("/trails", trailsRouter);
// games
// locations

module.exports = apiRouter;
