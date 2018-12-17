const db = require("../firestore");
const axios = require('axios');
const {cloudVisionAPIkey} = require('../config')

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

    const { name, region }  = req.body;

    const id = name.replace(/\s/g, '_').toLowerCase();
    
    db.collection('trails').doc(`${id}`)
      .set({name, region })
      .then(
          res.status(201).send({id})
      )
      .catch(next)
}

exports.addRouteToTrail = ( req, res, next) => {
    const { routeArray, id } = req.body;

    const routeWithChallengeId = routeArray.map(location => {
        return {...location, challengeId: location.locationName.replace(/\s/g, '_').toLowerCase() }
    })

    const challengeIds = routeWithChallengeId.reduce((acc, location) => {
        acc.push(location.challengeId)
        return acc
    }, [])

    const locationString = routeArray.reduce((acc, location, index, routeArray) => {
         if (index === 0) {
             return acc += `origin=${location.lat},${location.long}&destination=${location.lat},${location.long}&waypoints=`
         }  else if (index === routeArray.length - 1 ) {
             return acc += `via:${location.lat},${location.long}`
         } else {
            return acc += `via:${location.lat},${location.long}|`
         }
    }, '')

    axios.get(`https://maps.googleapis.com/maps/api/directions/json?${locationString}&mode=walking&key=${cloudVisionAPIkey}`)
    .then(data => {
        const duration =  (data.data.routes[0].legs[0].duration.value + ( 5 * routeArray.length * 60)) * 1000;

        db.collection('trails').doc(`${id}`)
        .update({
            route: routeWithChallengeId,
            duration
        })
    })
    .then(() => {
        res.status(201).send({challengeIds})
    })
    .catch(next)


}

exports.updateChallenge = ( req, res, next ) => {
    const { challengeType, question, answer, picture } = req.body;
    const { challengeId } = req.params;

    console.log(challengeType, '<<type' , question, 'ques', answer, '<<<ans', picture)
    console.log(Object.keys(picture), "keys")

}

exports.deleteTrail = ( req, res, next ) => {
    const { trailId } = req.params;
    db.collection('trails').doc(`${trailId}`)
      .delete()
      .then(() => res.status(201).send('Trail Deleted'))
}