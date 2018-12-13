const db = require("../firestore");
const admin = require("firebase-admin");
const axios = require('axios');
const { cloudVisionAPIkey } = require('../config');

const fs = require('fs')



const addGame = (gameName, gamePin, trailId, noOfPlayers, playersArray) => {
  const gameRef = db.collection("games").doc(`${gamePin}`);
  gameRef.set({ gameName, trailId, noOfPlayers, playersArray, gamePin });
};

exports.removeGame = (req, res, next) => {
  const { gamePin } = req.params;
    
  db.collection("games")
    .doc(`${gamePin}`)
    .delete()
    .then(() => {
      res.status(201).send("deleted");
    })

  }




exports.createGame = (req, res, next) => {
  const { gameName, trailId, noOfPlayers } = req.body;

  const docsArr = [];
  const playersArray = [];

  db.collection("games")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        docsArr.push(doc.id);
      });

      return (gamePin = generatePin(
        docsArr,
        String(Math.floor(1 + (9000 - 1) * Math.random()))
      ));
    })
    .then(gamePin => {
      addGame(gameName, gamePin, trailId, noOfPlayers, playersArray);
    })
    .then(() => {
      res
        .status(201)
        .send({ gameName, gamePin, trailId, noOfPlayers, playersArray });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

exports.getGameByPin = (req, res, next) => {
  const { gamePin } = req.params;
  db.collection("games")
    .doc(`${gamePin}`)
    .onSnapshot( gameSnapshot => {

      if (!gameSnapshot.exists) {
        res.status(400).send('No game found for that pin')
      } else{
        const game = gameSnapshot.data();
        res.status(201).send(game);
 
      }
        
    })
};

const generatePin = (pinArr, pin) => {
  if (!pinArr.includes(`${pin}`)) return pin;
  const newPin = String(Math.floor(1 + (9000 - 1) * Math.random()));
  return generatePin(pinArr, newPin);
};

// ---------------------------------- Players ------------------------------//

exports.addNewPlayer = (req, res, next) => {
  const { gamePin } = req.params;
  const { playerName } = req.body;
  const gameRef = db.collection("games").doc(gamePin);

  db.runTransaction(t => {
    return t.get(gameRef).then(gameDoc => {
      const game = gameDoc.data();

      if (game.playersArray.length === game.noOfPlayers - 1) {
        const startTime = Date.now();
        const startedGame = { ...game, startTime };
        t.update(gameRef, startedGame);
      }

      t.update(gameRef, {
        playersArray: admin.firestore.FieldValue.arrayUnion({
          playerName,
          progress: 0
        })
      });
    });
  })
    .then(() => res.status(201).send({playerName}))
    .catch(next);
};

exports.updatePlayerProgress = (req, res, next) => {
  const { gamePin } = req.params;
  const { end, advance } = req.query;
  const { playerName } = req.body;
  const gameRef = db.collection("games").doc(gamePin);

  db.runTransaction(t => {

    return t.get(gameRef).then(game => {
      const playersArray = game.data().playersArray
      
      let newArray = playersArray.map(player => {
        if (player.playerName === playerName && advance) {

         let progress =  player.progress += 1;

          return { ...player, progress };
        } else if (player.playerName === playerName && end) {
          const totalTime = Math.round(
            (Date.now() - game.data().startTime) / 60000
          );
          return { ...player, totalTime };
        } else {
          return player;
        }
      });
      t.update(gameRef, { playersArray: newArray });
    });
  }).then(result => res.status(201).send("Updated"));
};


exports.analyseImage = ( req, res, next ) => {

  const { encoded } = req.body;

  const imageReqBody = {
    "requests":[
      {
        "image":{
          "content": `${encoded}`
        },
        "features":[
          {
            "type":"LABEL_DETECTION",
            "maxResults":5
          }
        ]
      }
    ]
  }

 axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${cloudVisionAPIkey}`, imageReqBody)
   .then((response) => {

    const labelObj =response.data.responses[0].labelAnnotations.reduce((acc, label) => {
      acc[label.description] = label.score
      return acc;
    }, {})

     res.status(200).send(labelObj)
   })
 

}