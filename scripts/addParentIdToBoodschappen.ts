import Firebase from '../src/firebase';

Firebase.database().ref('/lijstjes/').once(
  'value',
  (snapshot) => {
    const obj = snapshot.val();
    const listIds = Object.keys(obj);
    listIds.forEach((listId) => {
      const boodschapIds: string[] = obj[listId].boodschappen;
      boodschapIds.forEach((itemId) => {
        Firebase.database().ref('/boodschappen/').child(itemId).child('parentId').set(listId);
        console.log(`Boodschap ${itemId} is set with parent ${listId}`);
      });
    });
  }
);
