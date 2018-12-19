const trailsRouter = require("express").Router();
const { getTrails, viewTrailById } = require("../controllers/trails");

trailsRouter.route("").get(getTrails);

trailsRouter.route('/:trailId').get(viewTrailById)

module.exports = trailsRouter;
