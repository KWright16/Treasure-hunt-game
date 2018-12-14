const adminRouter = require("express").Router();
const { getAdminByName, addNewChallenge, addNewTrail, addRouteToTrail } = require("../controllers/admin");

adminRouter.route("/:adminName").get(getAdminByName);

adminRouter.route('/:adminName/locations').post(addNewChallenge);

adminRouter.route('/:adminName/trails').post(addNewTrail).patch(addRouteToTrail);




module.exports = adminRouter;
