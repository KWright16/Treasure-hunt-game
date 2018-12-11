const apiRouter = require("express").Router();
const trailsRouter = require("./trails");

apiRouter.use("/trails", trailsRouter);
// games
// routes
// locations

module.exports = apiRouter;
