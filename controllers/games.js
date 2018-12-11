const db = require("../firestore");


const addGame = ( gameName, gamePin, trailId ) => {

    const gameRef = db.collection('games').doc(`${gamePin}`)
    gameRef.set({gameName, trailId})

}


exports.removeGame = (req, res, next) => {

    const { gamePin } = req.params;
    db.collection('games').doc(`${gamePin}`).delete()
       .then(() => {
           res.status(201).send('deleted')
       });
}


exports.createGame = ( req, res, next ) => {

    const { gameName, trailId, noOfPlayers } = req.body;
    const docsArr = [];
    const playersArray = [];
   

    db.collection('games').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                docsArr.push(doc.id)
            });
            
            return gamePin = generatePin(docsArr, Math.floor(1  + (9000 - 1) * Math.random()));
            
        })
        .then((gamePin) => {

            addGame( gameName, gamePin, trailId, noOfPlayers, playersArray )
        })
        .then(() => {
            
            res.status(201).send({ gameName, gamePin, trailId, noOfPlayers, playersArray })

        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

}


exports.getGameByPin = (req, res, next) => {
    const { gamePin } = req.params;
    db.collection('games').doc(`${gamePin}`).get()
       .then((game) => {
           if (!game.exists) {
               res.status(400).send('No game found for that Pin')
           } else {
               
               res.status(201).send(game.data())
           }
       });
}


const generatePin = (pinArr, pin) => {
    if (!pinArr.includes(`${pin}`)) return pin;
    const newPin = Math.floor(1  + (9000 - 1) * Math.random());
    return generatePin(pinArr, newPin)
}

// ---------------------------------- Players ------------------------------//

exports.addNewPlayer = (req, res, next) => {
    const { gameId } = req.params;
    const { playerName } = req.body
    db.collection('players')
       .add({ gameId, playerName, 'progress': '0' })
       .then((player) => {
           const id = player.id
           res.status(201).send( {id, gameId, playerName})
       })
       .catch(next)
}
