const db = require("../firestore");

exports.getPlayers = (req, res, next) => {
  
  db.collection("players")
    .get()
    .then(players => {
      const playersArray = [];
      players.forEach(player => {
        playersArray.push({ ...player.data(), id: player.id });
      });
      return playersArray;
    })
    .then(players => {
      res.status(200).send({ players });
    })
    .catch(next);
};



exports.addPlayersToLeaderboard = ( req, res, next ) => {
  const { gamePin } = req.params;

   db.collection("games").doc(gamePin).get()
     .then(game => {
       return game.data().playersArray
     }) 
     .then((playersArray) => {

      const batch = db.batch();

      for ( let i = 0; i < playersArray.length; i++) {
        let playerRef = db.collection('players').doc()

        batch.set(playerRef, playersArray[i])
      }

      return batch.commit()
      .then(() => res.status(201).send('added players'))
      .catch(next)
     
     });
  }

      
