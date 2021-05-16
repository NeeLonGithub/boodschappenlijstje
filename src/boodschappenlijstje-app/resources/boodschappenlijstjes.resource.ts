import Firebase from '../../firebase';

export interface AppData {
  lists: string[];
}

export const listenToBoodschappenlijstjes = (
  onNextBoodschappenlijstjes: (boodschappenlijstjeIds: string[]) => void
) => {
  const databaseRef = Firebase.database().ref(`/app/`).child('lists');
  databaseRef.on('value', snapshot => onNextBoodschappenlijstjes(snapshot.val()));
}

export const stopListeningToBoodschappenLijstjes = () => {
  const databaseRef = Firebase.database().ref(`/app/`).child('lists');
  databaseRef.off();
}

export const updateBoodschappenLijstjes = (boodschappenlijstjeIds: string[]) => {
  const databaseRef = Firebase.database().ref(`/app/`);
  databaseRef.update({ lists: boodschappenlijstjeIds });
}
