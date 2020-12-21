import React, { useEffect, useState } from 'react';
import './App.css';
import { Boodschap } from './App.model';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import { AfstreepItemModel } from './afstreep-item/AfstreepItem.model';
import Firebase from './firebase';

function App() {

  const [title, setTitle] = useState<string>('');
  const [boodschappen, setBoodschappen] = useState<Boodschap[]>([]);

  useEffect(() => {
    const databaseRef = Firebase.database().ref('/');
    databaseRef.once('value').then( snapshot => {
      const boodschappenlijstjes = snapshot.val().boodschappenlijstjes;

      setTitle(boodschappenlijstjes[0].title);
      setBoodschappen(boodschappenlijstjes[0].boodschappen);
    });
  }, []);


  const toggleBoodschap = (index: number) => {
    setBoodschappen((previousBoodschappen) => {
      return previousBoodschappen.map((boodschap, i) => {
        return i !== index ? boodschap : { ...boodschap, isChecked: !boodschap.isChecked };
      });
    });
  };

  const afstreepItems: AfstreepItemModel[] = boodschappen.map(
    (boodschap, index) => ({ ...boodschap, onClick: () => toggleBoodschap(index) })
  );

  return (
    <div className="App">
      <Boodschappenlijstje title={title} afstreepItems={afstreepItems}></Boodschappenlijstje>
    </div>
  );
}

export default App;
