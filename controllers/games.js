const db = require("../firestore");


const addGame = ( gameName, gamePin, trailId ) => {

    const gameRef = db.collection('games').doc(`${gamePin}`)
    gameRef.set({gameName, trailId})

}

const removeGame = (gamePin) => {
    db.collection('games').doc(`${gamePin}`).delete();
}


exports.createGame = ( req, res, next ) => {

    const { gameName, trailId } = req.body;
    const gamePin =  Math.floor(1  + (9000 - 1) * Math.random());

    
}