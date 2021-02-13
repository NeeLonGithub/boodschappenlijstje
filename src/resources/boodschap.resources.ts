import Firebase from '../firebase';

export interface Boodschap {
  name: string;
  isChecked: boolean;
}

export const listenToBoodschap = (boodschapId: string, onNextBoodschap: (boodschap: Boodschap) => void) => {
  const databaseRef = Firebase.database().ref(`/boodschappen/`).child(boodschapId);
  databaseRef.on('value', snapshot => onNextBoodschap(snapshot.val()));
}

export const stopListeningToBoodschap = (boodschapId: string) => {
  const databaseRef = Firebase.database().ref(`/boodschappen/`).child(boodschapId);
  databaseRef.off();
}

export const updateBoodschapIsChecked = (boodschapId: string, isChecked: boolean) => {
  const databaseRef = Firebase.database().ref(`/boodschappen/`).child(boodschapId);
  databaseRef.update({isChecked: isChecked});
}
