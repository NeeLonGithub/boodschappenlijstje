import Firebase from '../../firebase';
import { ListPrivileges } from './privileges.types';

export interface UserGroup {
  name: string,
  public: boolean,
  owner: string,
  users: Record<string, ListPrivileges>
}

const userGroupPath: string = '/user-groups/'

export const listToUserGroup = (userGroupId: string, onNextUserGroup: (userGroup: UserGroup) => void) => {
  const databaseRef = Firebase.database().ref(userGroupPath).child(userGroupId);
  databaseRef.on('value', snapshot => onNextUserGroup(snapshot.val()));
}

export const stopListeningToUserGroup = (userGroupId: string) => {
  const databaseRef = Firebase.database().ref(userGroupPath).child(userGroupId);
  databaseRef.off();
}

export const createUserGroup = (userGroup: UserGroup) => {
  return Firebase.database().ref(userGroupPath).push(userGroup).key as string;
}

export const deleteUserGroup = (userGroupId: string) => {
  return Firebase.database().ref(userGroupPath).child(userGroupId).remove();
}
