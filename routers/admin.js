const adminRouter = require("express").Router();
const { getAdminByName, 
    addNewChallenge, 
    addNewTrail, 
    addRouteToTrail,
    updateChallenge,
    deleteTrail } = require("../controllers/admin");

adminRouter.route("/:adminName").get(getAdminByName);

adminRouter.route('/:adminName/locations').post(addNewChallenge);

adminRouter.route('/:adminName/trails').post(addNewTrail).patch(addRouteToTrail);

adminRouter.route('/:adminName/trails/:trailId').delete(deleteTrail)

adminRouter.route('/:adminName/challenges/:challengeId').post(updateChallenge)


module.exports = adminRouter;
