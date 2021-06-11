import React from 'react';
import Firebase from 'firebase';
import './AccountStuff.scss';
import EditableUsername from './editable-username/EditableUsername';
import EditUserPublicity from './edit-user-visability/EditUserVisability';

interface AccountStuffProps {}

const AccountStuff: React.FunctionComponent<AccountStuffProps> = () => {

  return (<div className={'account-stuff'}>
    <h1>My Account</h1>
    <EditableUsername />
    <EditUserPublicity />
    <button style={{alignSelf: 'flex-end', margin: '0 0 20px 0'}} onClick={() => Firebase.auth().signOut()}>Sign out</button>
  </div>);
}

export default AccountStuff;
