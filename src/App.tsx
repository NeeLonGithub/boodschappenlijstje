import React, { useState } from 'react';
import './App.scss';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import { BoodschappenlijstjesOverview } from './boodschappenlijstjes-overview/BoodschappenlijstjesOverview';

function App() {

  const [selectedLijstje, setSelectedLijstje] = useState<string>();

  const viewLijstje = (lijstjeId: string) => {
    setSelectedLijstje(lijstjeId);
  };

  if (!selectedLijstje) {
    return (
      <div className="App">
        <BoodschappenlijstjesOverview selectLijstje={viewLijstje}/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <button onClick={() => setSelectedLijstje(undefined)}>Terug</button>
        <Boodschappenlijstje boodschappenlijstjeId={selectedLijstje}/>
      </div>
    );
  }
}

export default App;
