export interface UserPrivileges {
  list: ListPrivileges
}

export interface ListPrivileges {
  canReadBoodschappen: boolean,
  canToggleBoodschappen: boolean,
  canEditBoodschappenList: boolean,
}

export interface GroupPrivileges {
  canEditGroupName: boolean,
  canEditGroupPublicFlag: boolean,
  canEditGroupOwner: boolean,
  canEditGroupUsers: boolean
}
