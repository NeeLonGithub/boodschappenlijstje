import React, { useState } from 'react';
import './App.css';
import { Boodschap } from './App.model';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import { AfstreepItemModel } from './afstreep-item/AfstreepItem.model';

function App() {
  const firstBoodschappen: Boodschap[] = [
    { name: 'appels', isChecked: true },
    { name: 'brood', isChecked: true },
    { name: 'cola', isChecked: false },
    { name: 'drop', isChecked: false },
    { name: 'erwten', isChecked: true },
    { name: 'fristi', isChecked: false }
  ];

  const [boodschappen, setBoodschappen] = useState<Boodschap[]>(firstBoodschappen);

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
      <Boodschappenlijstje titel={'Test lijstje'} afstreepItems={afstreepItems}></Boodschappenlijstje>
    </div>
  );
}

export default App;
