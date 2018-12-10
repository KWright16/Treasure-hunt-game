const trailsRouter = require("express").Router();
const { getTrails } = require("../controllers/trails");

trailsRouter.route("").get(getTrails);

module.exports = trailsRouter;
