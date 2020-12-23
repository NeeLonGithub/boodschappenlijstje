import React, { useEffect, useState } from 'react';
import './App.css';
import { Boodschap } from './App.model';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import Firebase from './firebase';

function App() {

  const listIndex = 0;

  const [title, setTitle] = useState<string>('');
  const [boodschappen, setBoodschappen] = useState<Boodschap[]>([]);

  useEffect(() => {
    const databaseRef = Firebase.database().ref(`/boodschappenlijstjes/${listIndex}/`);
    databaseRef.on('value', snapshot => {
      const boodschappenlijstje = snapshot.val();

      setTitle(boodschappenlijstje.title);
      setBoodschappen(boodschappenlijstje.boodschappen);
    });
  }, []);

  const createUpdateLijstjeFunction = (index: number) => {
    return (title: string, boodschappen: Boodschap[]) => {
      const databaseRef = Firebase.database().ref(`/boodschappenlijstjes/${index}/`);
      setTitle(title);
      setBoodschappen(boodschappen);
      databaseRef.set({ title: title, boodschappen: boodschappen });
    };
  };

  return (
    <div className="App">
      <Boodschappenlijstje
        title={title}
        boodschappen={boodschappen}
        updateLijstje={createUpdateLijstjeFunction(listIndex)}
      ></Boodschappenlijstje>
    </div>
  );
}

export default App;
