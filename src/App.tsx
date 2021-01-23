import React, { useEffect, useState } from 'react';
import './App.scss';
import { Boodschap, BoodschappenlijstjeData } from './App.model';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import Firebase from './firebase';

function App() {

  const [listIndex, setListIndex] = useState<number>(-1);
  const [boodschappenlijstjes, setBoodschappenlijstjes] = useState<BoodschappenlijstjeData[]>([]);

  useEffect(() => {
    const databaseRef = Firebase.database().ref(`/boodschappenlijstjes/`);
    databaseRef.on('value', snapshot => {
      const lijstjes: BoodschappenlijstjeData[] = snapshot.val();

      setBoodschappenlijstjes(lijstjes);
      if (listIndex === -1 && lijstjes.length === 1) {
        setListIndex(0);
      }
    });
  }, [listIndex]);

  const createUpdateBoodschappenFunction = (index: number) => {
    return (boodschappen: Boodschap[]) => {
      const databaseRef = Firebase.database().ref(`/boodschappenlijstjes/${index}/boodschappen/`);
      const newLijstjes: BoodschappenlijstjeData[] = [...boodschappenlijstjes];
      newLijstjes[index] = { ...newLijstjes[index], boodschappen: boodschappen };
      setBoodschappenlijstjes(newLijstjes);
      databaseRef.set(boodschappen);
    };
  };

  if (listIndex === -1) {
    return (
      <div className="App">
        <h1>Boodschappenlijstjes</h1>
        {boodschappenlijstjes.map(
          (boodschappenlijstje, index) => (
            <div className="App__clickable-text"
                 key={boodschappenlijstje.title}
                 onClick={() => setListIndex(index)}>
              {boodschappenlijstje.title}
            </div>
          )
        )}
      </div>
    );
  } else {
    return (
      <div className="App">
        {boodschappenlijstjes.length > 1 ? (<button onClick={() => setListIndex(-1)}>Terug</button>) : null}
        <Boodschappenlijstje
          title={boodschappenlijstjes[listIndex].title}
          boodschappen={boodschappenlijstjes[listIndex].boodschappen}
          updateBoodschappen={createUpdateBoodschappenFunction(listIndex)}
        />
      </div>
    );
  }
}

export default App;
