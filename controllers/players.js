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



exports.addPlayerToLeaderboard = ( req, res, next ) => {
  const {  playerName } = req.params;
  const { totalTime, trailName } = req.body;
   
  db.collection('players').doc()
  .set({
    playerName, totalTime, trailName
  })
  .then(() => {

    
    res.status(201).send('player added to leaderboard')
  })

  
  }

      
