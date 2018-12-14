const locationsRouter = require("express").Router();
const { getLocationsById } = require("../controllers/locations");

locationsRouter.route("/:locationId").get(getLocationsById);



module.exports = locationsRouter;
