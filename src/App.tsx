import React, { useEffect, useState } from 'react';
import './App.css';
import { Boodschap } from './App.model';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import Firebase from './firebase';
import { BoodschappenlijstjeData } from './boodschappenlijstje/Boodschappenlijstje.model';

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

  const createUpdateLijstjeFunction = (index: number) => {
    return (title: string, boodschappen: Boodschap[]) => {
      const databaseRef = Firebase.database().ref(`/boodschappenlijstjes/${index}/`);
      const newLijstjes: BoodschappenlijstjeData[] = [...boodschappenlijstjes];
      newLijstjes[index] = { title: title, boodschappen: boodschappen };
      setBoodschappenlijstjes(newLijstjes);
      databaseRef.set({ title: title, boodschappen: boodschappen });
    };
  };

  if (listIndex === -1) {
    return (
      <div className="App">
        <h1>Boodschappenlijstjes</h1>
        {boodschappenlijstjes.map(
          (boodschappenlijstje, index) => (<div key={boodschappenlijstje.title} onClick={() => setListIndex(index)}>{boodschappenlijstje.title}</div>)
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
          updateLijstje={createUpdateLijstjeFunction(listIndex)}
        ></Boodschappenlijstje>
      </div>
    );
  }
}

export default App;
