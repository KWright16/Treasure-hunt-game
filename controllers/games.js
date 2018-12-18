const db = require("../firestore");
const admin = require("firebase-admin");
const axios = require("axios");
const { stringify } = require('flatted/cjs')
const { cloudVisionAPIkey } = process.env.visionKey || require("../config");

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
    .catch(next);
};

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
        (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
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
      res.send("Error getting documents");
    });
};

exports.getGameByPin = (req, res, next) => {
  const { gamePin } = req.params;
  db.collection("games")
    .doc(`${gamePin}`)
    .get()
    .then(gameDoc => {
      if (!gameDoc.exists) {
        res.status(404).send("No such trail");
      } else {
        const game = gameDoc.data();
        res.status(200).send({ game });
      }
    })
    .catch(next);
  // .onSnapshot( gameSnapshot => {

  //   if (!gameSnapshot.exists) {
  //     res.status(400).send('No game found for that pin')
  //   } else{
  //     const game = gameSnapshot.data();
  //     res.status(201).send(game);

  //   }

  // })
};

const generatePin = (pinArr, pin) => {
  if (!pinArr.includes(`${pin}`)) return pin;
  const newPin = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);
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
    .then(() => res.status(201).send({ playerName }))
    .catch(next);
};

exports.updatePlayerProgress = (req, res, next) => {
  const { gamePin } = req.params;
  const { end, advance } = req.query;
  const { playerName } = req.body;
  const gameRef = db.collection("games").doc(gamePin);

  db.runTransaction(t => {
    return t.get(gameRef).then(game => {
      const playersArray = game.data().playersArray;

      let newArray = playersArray.map(player => {
        if (player.playerName === playerName && advance) {
          let progress = (player.progress += 1);

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
  })
    .then(result => res.status(201).send("Updated"))
    .catch(next);
};

exports.analyseImage = (req, res, next) => {
  const { URL } = req.body;

  const imageReqBody = {
    "requests": [
      {
        "image": {
          "source": {
            "imageUri": `${URL}`
          }
        },
        "features": [
          {
            "type": "LABEL_DETECTION",
            "maxResults": 5
          }
        ]
      }
    ]
  };

  axios
    .post(
      `https://vision.googleapis.com/v1/images:annotate?key=${cloudVisionAPIkey}`,
      imageReqBody
    ).catch((err) => {
      console.log(err)
    })
    .then(response => {
      console.log(response)
      const labelObj1 = response.data.responses[0].labelAnnotations.reduce((acc, label) => {
        const { score, description } = label;
        return { ...acc, [description]: score };
      }, {});

      // console.log(labelObj)

      res.status(200).send({ labelObj: stringify(labelObj1) });
    })
    .catch((err) => {
      res.send(err)
    });
};
