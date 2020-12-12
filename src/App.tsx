import React, { useState } from 'react';
import './App.css';
import { AfstreepItem } from './afstreepItem/AfstreepItem';
import { Boodschap } from './App.model';

function App() {
  const firstBoodschappen: Boodschap[] = [{name: 'appels', isChecked: true},
    {name: 'brood', isChecked: true},
    {name: 'cola', isChecked: false},
    {name: 'drop', isChecked: false},
    {name: 'erwten', isChecked: true},
    {name: 'fristi', isChecked: false}
  ];

  const [boodschappen, setBoodschappen] = useState<Boodschap[]>(firstBoodschappen);

  const toggleBoodschap = (index: number) => {
    setBoodschappen((previousBoodschappen) => {
      return previousBoodschappen.map((boodschap, i) => {
        return i !== index ? boodschap : {...boodschap, isChecked: !boodschap.isChecked};
      });
    });
  };

  return (
    <div className="App">
      <h1>Boodschappenlijstje</h1>
      <div>
        {boodschappen.map((boodschap, index)=>{
          return (<AfstreepItem
            key={boodschap.name}
            name={boodschap.name}
            isChecked={boodschap.isChecked}
            onClick={() => {
              toggleBoodschap(index);
              console.log(boodschap);

            }}
          ></AfstreepItem>);
        })}
      </div>
    </div>
  );
}

export default App;
