import Firebase from '../../firebase';
import { deleteBoodschap } from './boodschap.resources';

export interface Boodschappenlijst {
  title: string;
  boodschappen: string[];
  ownerId: string;
}

export const listenToBoodschappenlijstjes = (
  onNextBoodschappenlijstjes: (boodschappenlijstjeIds: string[]) => void
) => {
  const databaseRef = Firebase.database().ref(`/listIds/`);
  databaseRef.on('value', async (snapshot) => {
    const availableListIds: string[] = Object.keys(snapshot.val());
    const readableLists: string[] = (await Promise.all(availableListIds.map(
      (listId) => Firebase.database().ref(`/lijstjes/`).child(listId).once('value').then(() => listId).catch(() => '')
    ))).filter(listId => listId !== '');
    return onNextBoodschappenlijstjes(readableLists);
  });
}

export const stopListeningToBoodschappenLijstjes = () => {
  const databaseRef = Firebase.database().ref(`/listIds/`);
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

// export const updateBoodschappenlijstjeOwner = (boodschappenlijstId: string, userId: string) => {
//   const databaseRef = Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId);
//   databaseRef.update({owner: userId});
// }
//
// export const addBoodschappenlijstjeUser = (boodschappenlijstId: string, userId: string, privileges: UserPrivileges) => {
//   const databaseRef = Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId).child('users').child(userId);
//   return databaseRef.set(privileges);
// }
//
// export const updateBoodschappenlijstjeUser = (boodschappenlijstId: string, userId: string, privileges: UserPrivileges) => {
//   const databaseRef = Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId).child('users').child(userId);
//   databaseRef.update(privileges);
// }
//
// export const removeBoodschappenlijstjeUser = (boodschappenlijstId: string, userId: string) => {
//   return Firebase.database().ref(`/lijstjes/`).child(boodschappenlijstId).child('users').child(userId).remove();
// }

export const createBoodschappenlijstje = () => {
  const currentUserId = Firebase.auth().currentUser?.uid;
  const listId = Firebase.database().ref(`/lijstjes/`).push({ ownerId: currentUserId }).key as string;
  Firebase.database().ref(`/listIds/`).child(listId).set(true);
  return listId;
}

export const deleteBoodschappenlijstje = (listId: string) => {
  Firebase.database().ref(`/listIds/`).child(listId).remove();
  listenToBoodschappenlijstje(listId,
    (boodschappenlijst: Boodschappenlijst) => {
      boodschappenlijst.boodschappen?.forEach((boodschapId: string) => deleteBoodschap(boodschapId));
    }
  );
  stopListeningToBoodschappenLijstje(listId);
  return Firebase.database().ref(`/lijstjes/`).child(listId).remove();
}
