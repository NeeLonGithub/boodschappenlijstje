import Firebase from '../../firebase';
import { deleteBoodschap } from './boodschap.resources';

export interface Boodschappenlijst {
  title: string;
  boodschappen: string[];
}

export const listenToBoodschappenlijstjes = (
  onNextBoodschappenlijstjes: (boodschappenlijstjeIds: string[]) => void
) => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`);
  databaseRef.on('value', snapshot => onNextBoodschappenlijstjes(Object.keys(snapshot.val())));
}

export const stopListeningToBoodschappenLijstjes = () => {
  const databaseRef = Firebase.database().ref(`/lijstjes/`);
  databaseRef.off();
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

export const createBoodschappenlijstje = () => {
  return Firebase.database().ref(`/lijstjes/`).push().key as string;
}

export const deleteBoodschappenlijstje = (boodschappenlijstId: string) => {
  listenToBoodschappenlijstje(boodschappenlijstId,
    (boodschappenlijst: Boodschappenlijst) => {
      boodschappenlijst.boodschappen?.forEach((boodschapId: string) => deleteBoodschap(boodschapId));
    }
  );
  stopListeningToBoodschappenLijstje(boodschappenlijstId);
  return Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId).remove();
}
