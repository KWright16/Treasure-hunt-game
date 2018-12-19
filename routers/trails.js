const trailsRouter = require("express").Router();
const { getTrails, viewTrailById, getTrailById } = require("../controllers/trails");

trailsRouter.route("").get(getTrails);

trailsRouter.route("/:trailId")
    .post(getTrailById)
    .get(viewTrailById)

module.exports = trailsRouter;
