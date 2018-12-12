const db = require("../firestore");
const admin = require("firebase-admin");

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
    });
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
        Math.floor(1 + (9000 - 1) * Math.random())
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
    .get()
    .then(game => {
      if (!game.exists) {
        res.status(400).send("No game found for that Pin");
      } else {
        res.status(201).send(game.data());
      }
    });
};

const generatePin = (pinArr, pin) => {
  if (!pinArr.includes(`${pin}`)) return pin;
  const newPin = Math.floor(1 + (9000 - 1) * Math.random());
  return generatePin(pinArr, newPin);
};

// ---------------------------------- Players ------------------------------//

exports.addNewPlayer = (req, res, next) => {
  const { gameId } = req.params;
  const { playerName } = req.body;
  db.collection("games")
    .doc(`${gameId}`)
    .update({
      playersArray: admin.firestore.FieldValue.arrayUnion({
        playerName,
        progress: 0
      })
    })
    .then(() => res.status(201).send("Player added"))
    .catch(next);
};

exports.updatePlayerProgress = (req, res, next) => {
  const { gameId } = req.params;
  const { playerName, progress } = req.body;
  const gameRef = db.collection("games").doc(gameId);
  db.runTransaction(t => {
    return t.get(gameRef).then(game => {
      const newArray = game.data().playersArray.map(player => {
        if (player.playerName === playerName) {
          return { playerName, progress };
        } else {
          return player;
        }
      });
      t.update(gameRef, { playersArray: newArray });
    });
  }).then(result => res.status(201).send("Updated progress"));
};
