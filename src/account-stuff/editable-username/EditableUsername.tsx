import React, { useEffect, useState } from 'react';
import { TextInputField } from '../../components/text-input-field/TextInputField';
import Firebase from 'firebase';
import './EditableUsername.scss';
import { addUserToPublicUsers, listenToPublicUserInfo, stopListeningToPublicUserInfo } from '../../boodschappenlijstje-app/resources/user-visability.resource';
import { userInfo } from 'os';

interface EditableUsernameProps {
}

const EditableUsername: React.FunctionComponent<EditableUsernameProps> = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const username = Firebase.auth().currentUser?.displayName || '';
    setUsername(username);
  }, []);

  const updatePublicUserInfo = () => {
    const userId = Firebase.auth().currentUser?.uid || '';
    listenToPublicUserInfo(userId, (userInfo) => {
      if(userInfo) {
        console.log('adding current user');
        addUserToPublicUsers();
      }
    });
  };

  const updateUsername = async (name: string) => {
    if (name && name !== username) {
      await Firebase.auth().currentUser?.updateProfile({ displayName: name });
      setUsername(name);
      updatePublicUserInfo();
    }
    setIsEditing(false);
  };

  return (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
    <div>Let me be known as:</div>
    {
      isEditing ?
        <TextInputField text={username} onChange={updateUsername} className={'editable-text editable-text-input'}/> :
        <button className={'editable-text editable-text-button'} onClick={() => setIsEditing(true)}>{username}</button>
    }
  </div>);
};

export default EditableUsername;
