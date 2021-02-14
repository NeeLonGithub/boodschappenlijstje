import Firebase from '../firebase';

export interface Boodschappenlijst {
  title: string;
  boodschappen: string[];
}

export const listenToBoodschappenlijstje = (
  boodschappenlijstId: string, onNextBoodschappenlijst: (boodschappenlijstje: Boodschappenlijst) => void
) => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId);
  databaseRef.on('value', snapshot => onNextBoodschappenlijst(snapshot.val()));
}

export const stopListeningToBoodschappenLijstje = (boodschappenlijstId: string) => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId);
  databaseRef.off();
}

export const updateBoodschappenlijstjeTitle = (boodschappenlijstId: string, title: string) => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId);
  databaseRef.update({title: title});
}

export const updateBoodschappenlijstjeBoodschappen = (boodschappenlijstId: string, boodschapIds: string[]) => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId);
  databaseRef.update({boodschappen: boodschapIds});
}
