import React, { useEffect, useState } from 'react';
import { addUserToPublicUsers, listenToPublicUserInfo, removeUserFromPublicUsers, stopListeningToPublicUserInfo } from '../../boodschappenlijstje-app/resources/user-visability.resource';
import Firebase from 'firebase';

interface EditUserPublicityProps {
}

const EditUserPublicity: React.FunctionComponent<EditUserPublicityProps> = () => {

  const [userIsPublic, setUserIsPublic] = useState<boolean>(false);

  useEffect(() => {
    const userId = Firebase.auth().currentUser?.uid || '';
    console.log(userId);
    listenToPublicUserInfo(userId, (userInfo) => {
      console.log(userInfo);
      setUserIsPublic(!!userInfo);
    });
    return () => stopListeningToPublicUserInfo(userId);
  }, []);

  const onHideFromThePublic = async () => {
    await removeUserFromPublicUsers();
    setUserIsPublic(false);
  }

  const onShowTomThePublic = async () => {
    console.log('adding current user');
    await addUserToPublicUsers();
    setUserIsPublic(true);
  }

  if (userIsPublic) {
    return <div>
      <div>You can be found by other users now!</div>
      <button onClick={onHideFromThePublic}>Hide from the public</button>
    </div>
  } else {
    return <div>
      <div>You are hidden for other users.</div>
      <button onClick={onShowTomThePublic}>Be public to other users</button>
    </div>
  }
};

export default EditUserPublicity;
