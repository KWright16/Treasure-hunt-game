const db = require("../firestore");

exports.getPlayerById = ( req, res, next ) => {
    
    const { playerId } = req.params;
    
    db.collection('players').doc(playerId).get()
       .then(player => {
           res.status(200).send(player.data())
       })
       .catch(next)
}

exports.updatePlayerProgress = ( req, res, next ) => {
    const { playerId } = req.params;
    const { progress } = req.body;

    db.collection('players').doc(playerId)
        .update({ progress })
        .then(() =>  res.status(201).send('updated progress') )
        
}