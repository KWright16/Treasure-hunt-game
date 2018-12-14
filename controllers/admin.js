const db = require("../firestore");

exports.getAdminByName = ( req, res, next ) => {
    const { adminName } = req.params;
    
    db.collection('admins').doc(`${adminName}`).get()
       .then((adminDoc) => {
          if (!adminDoc.exists) {
              res.status(400).send('No admin found for that admin')
          } else {
               res.status(200).send(adminDoc.data())
          }
       })

}

exports.addNewChallenge = ( req, res, next ) => {
   
}

exports.addNewTrail = ( req, res, next ) => {
    const { name, region, id }  = req.body;
    
    db.collection('trails').doc(`${id}`)
      .set({name, region })
      .then(
          res.status(201).send('trail added')
      )
      .catch(next)
}

exports.addRouteToTrail = ( req, res, next) => {
    const { routeArray } = req.body;

    
}