import React, { useState } from 'react';
import './App.scss';
import { Login } from './login/Login';
import Firebase from './firebase';
import Loading from './loading/Loading';
import BoodschappenlijstjeApp from './boodschappenlijstje-app/BoodschappenlijstjeApp';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  Firebase.auth().onAuthStateChanged(
    (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    }
  );

  if (isLoading) {
    return (
      <div className="App">
        <Loading />
      </div>
    )
  } else if (!isLoggedIn) {
    return (
      <div className="App">
        <Login onLogin={() => setIsLoggedIn(true)}/>
      </div>
    )
  } else {
    return <BoodschappenlijstjeApp />
  }
}

export default App;
