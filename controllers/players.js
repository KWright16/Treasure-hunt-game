const db = require("../firestore");

exports.getPlayerById = (req, res, next) => {
  const { playerId } = req.params;

  db.collection("players")
    .doc(playerId)
    .get()
    .then(player => {
      if (!player.exists) {
        res.status(400).send("No player found for that ID");
      } else {
        res.status(200).send(player.data());
      }
    })
    .catch(next);
};
