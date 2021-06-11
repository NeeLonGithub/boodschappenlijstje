import React, { PropsWithChildren, useState } from 'react';
import Firebase from '../firebase';
import './AccountHeader.scss';
import AccountStuff from '../account-stuff/AccountStuff';
import CrossInCirkelIcon from '../icons/cross-in-cirkel-icon';

interface AccountHeaderProps {}

const AccountHeader: React.FunctionComponent<PropsWithChildren<AccountHeaderProps>> = ({children}) => {

  const [isAccountPageOpen, setIsAccountPageOpen] = useState(false);

  return (
    <div className="App">
      <button className={'profile-image-button'} onClick={() => setIsAccountPageOpen(!isAccountPageOpen)}>
        {
          isAccountPageOpen ?
            <CrossInCirkelIcon /> :
            <img className={'profile-image'} src={Firebase.auth().currentUser?.photoURL || undefined} />
        }
      </button>
      { isAccountPageOpen ? <AccountStuff /> : children }
    </div>);
};

export default AccountHeader;
