import Firebase from '../firebase';
import { Boodschappenlijst } from './boodschappenlijstje.resource';

export const listenToBoodschappenlijstjes = (
  onNextBoodschappenlijstjes: (boodschappenlijstjes: {[boodschappenlijstjeId: string]: Boodschappenlijst}) => void
) => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`);
  databaseRef.on('value', snapshot => onNextBoodschappenlijstjes(snapshot.val()));
}

export const stopListeningToBoodschappenLijstjes = () => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`);
  databaseRef.off();
}
