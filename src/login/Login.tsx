import React, { useEffect, useState } from 'react';
import Firebase from '../firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import Loading from '../loading/Loading';

export interface LoginSpecs {
  onLogin: () => void;
}

export const Login: React.FunctionComponent<LoginSpecs> = ({onLogin}) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(Firebase.auth());

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
        onLogin();
        return false;
      },
      uiShown: () => setIsLoading(false)
    },
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      Firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  return (<div>
    <h1>Boodschappenlijstjes App</h1>
    { isLoading ? <Loading /> : null }
    <div id="firebaseui-auth-container"></div>
  </div>);
}
