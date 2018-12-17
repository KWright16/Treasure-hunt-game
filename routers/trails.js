const trailsRouter = require("express").Router();
const { getTrails, getTrailById } = require("../controllers/trails");

trailsRouter.route("").get(getTrails);

trailsRouter.route("/:trailId").post(getTrailById);

module.exports = trailsRouter;
