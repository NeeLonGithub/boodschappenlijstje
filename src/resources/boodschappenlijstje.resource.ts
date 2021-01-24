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

export const listenToBoodschappenlijstjes = (
  onNextBoodschappenlijstjes: (boodschappenlijstjes: {[boodschappenlijstjeId: string]: Boodschappenlijst}) => void
) => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`);
  databaseRef.on('value', snapshot => onNextBoodschappenlijstjes(snapshot.val()));
}
