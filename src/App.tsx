import React, { useState } from 'react';
import './App.scss';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import { EditBoodschappenlijstje } from './boodschappenlijstje/edit-boodschappenlijstje/EditBoodschappenlijstje';
import { BoodschappenlijstjesOverview } from './boodschappenlijstjes-overview/BoodschappenlijstjesOverview';
import { Login } from './login/Login';
import Firebase from './firebase';
import Loading from './loading/Loading';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLijstje, setSelectedLijstje] = useState<string>();
  const [editMode, setEditMode] = useState<boolean>(false);

  Firebase.auth().onAuthStateChanged(
    (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    }
  );

  const viewLijstje = (lijstjeId: string) => {
    setEditMode(false);
    setSelectedLijstje(lijstjeId);
  };

  const editLijstje = (lijstjeId: string) => {
    setEditMode(true);
    setSelectedLijstje(lijstjeId);
  };

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
  } else if (!selectedLijstje) {
    return (
      <div className="App">
        <BoodschappenlijstjesOverview selectLijstje={viewLijstje} editLijstje={editLijstje}/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <button onClick={() => setSelectedLijstje(undefined)}>Terug</button>
        {editMode ?
          <EditBoodschappenlijstje boodschappenlijstjeId={selectedLijstje}/> :
          <Boodschappenlijstje boodschappenlijstjeId={selectedLijstje}/>}
      </div>
    );
  }
}

export default App;
