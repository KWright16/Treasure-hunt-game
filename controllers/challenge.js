const db = require("../firestore");

exports.getChallengeById = (req, res, next) => {
  const { challengeId } = req.params;

  db.collection("challenges")
    .doc(challengeId)
    .get()
    .then(challengeDoc => {
      if (!challengeDoc.exists) {
        res.status(404).send("No such challenge");
      } else {
        const challenge = challengeDoc.data();
        res.status(200).send({ challenge });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

exports.checkAnswer = ( req, res, next ) => {

  const { answer } = req.body;
  
}
