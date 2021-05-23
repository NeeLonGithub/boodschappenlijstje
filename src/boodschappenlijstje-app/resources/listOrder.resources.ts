import Firebase from '../../firebase';

export const listenToListOrder = (
  onNextListOrder: (listIds: string[]) => void
) => {
  const userId = Firebase.auth().currentUser?.uid;
  if(userId) {
    const databaseRef = Firebase.database().ref('/users/').child(userId).child('listOrder');
    databaseRef.on('value', snapshot => onNextListOrder(snapshot.val()));
  }
}

export const stopListeningToListOrder = () => {
  const userId = Firebase.auth().currentUser?.uid;
  if(userId) {
    const databaseRef = Firebase.database().ref('/users/').child(userId).child('listOrder');
    databaseRef.off();
  }
}

export const updateListOrder = (listIds: string[]) => {
  const userId = Firebase.auth().currentUser?.uid;
  if(userId) {
    const databaseRef = Firebase.database().ref('/users/').child(userId);
    databaseRef.update({ listOrder: listIds });
  }
}
