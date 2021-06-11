import Firebase from '../../firebase';

export interface PublicUserInfo {
  name: string
}

const publicUserInfoPath: string = '/public-user-info/';

export const listenToPublicUsers = (onNextPublicUsers: (publicUsers: Record<string, PublicUserInfo>) => void) => {
  const databaseRef = Firebase.database().ref(publicUserInfoPath);
  databaseRef.on('value', snapshot => onNextPublicUsers(snapshot.val() || {}));
}

export const stopListeningToPublicUsers = () => {
  const databaseRef = Firebase.database().ref(publicUserInfoPath);
  databaseRef.off();
}

export const listenToPublicUserInfo = (userId: string, onNextPublicUserInfo: (userInfo: PublicUserInfo | null) => void) => {
  const databaseRef = Firebase.database().ref(publicUserInfoPath).child(userId);
  databaseRef.on('value', snapshot => onNextPublicUserInfo(snapshot.val()));
}

export const stopListeningToPublicUserInfo = (userId: string) => {
  const databaseRef = Firebase.database().ref(publicUserInfoPath).child(userId);
  databaseRef.off();
}

export const addUserToPublicUsers = (): Promise<void> => {
  const user: Firebase.User | null = Firebase.auth().currentUser;
  if (user) {
    const databaseRef = Firebase.database().ref(publicUserInfoPath).child(user.uid);
    const userInfo: PublicUserInfo = {
      name: user.displayName || 'No name provided'
    }
    return databaseRef.set(userInfo);
  }
  return Promise.resolve();
};

export const removeUserFromPublicUsers =  (): Promise<void> => {
  const user: Firebase.User | null = Firebase.auth().currentUser;
  if (user) {
    const databaseRef = Firebase.database().ref(publicUserInfoPath).child(user.uid);
    return databaseRef.remove();
  }
  return Promise.resolve();
};
