// this drops the database before each testing run. No inbuilt firestore method.

const dropDatabase = (db, collectionPath) => {
  var collectionRef = db.collection(collectionPath);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, collectionRef, resolve, reject);
  });
};
function deleteQueryBatch(db, collectionRef, resolve, reject) {
  collectionRef
    .get()
    .then(snapshot => {
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      var batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, collectionRef, resolve, reject);
      });
    })
    .catch(reject);
}

module.exports = dropDatabase;
