const trailsRouter = require("express").Router();
const { getTrails, getTrailById } = require("../controllers/trails");

trailsRouter.route("").get(getTrails);

trailsRouter.route('/:trailId').get(getTrailById);

module.exports = trailsRouter;
