import React, { useEffect, useState } from 'react';
import './App.scss';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import { Boodschappenlijst, listenToBoodschappenlijstjes } from './resources/boodschappenlijstje.resource';

function App() {

  const [selectedLijstje, setSelectedLijstje] = useState<string>();
  const [boodschappenlijstjes, setBoodschappenlijstjes] = useState<{[listId:string]: Boodschappenlijst}>({});

  useEffect(() => {
    listenToBoodschappenlijstjes(lijstjes => {
      setBoodschappenlijstjes(lijstjes);
      if (!selectedLijstje && Object.keys(lijstjes).length === 1) {
        setSelectedLijstje(Object.keys(lijstjes)[0]);
      }
    });
  }, [selectedLijstje]);

  if (!selectedLijstje) {
    return (
      <div className="App">
        <h1>Boodschappenlijstjes</h1>
        {Object.keys(boodschappenlijstjes).map(
          (lijstjeId) => (
            <div className="App__clickable-text"
                 key={lijstjeId}
                 onClick={() => setSelectedLijstje(lijstjeId)}>
              {boodschappenlijstjes[lijstjeId].title}
            </div>
          )
        )}
      </div>
    );
  } else {
    return (
      <div className="App">
        {Object.keys(boodschappenlijstjes).length > 1 ? (<button onClick={() => setSelectedLijstje(undefined)}>Terug</button>) : null}
        <Boodschappenlijstje
          boodschappenlijstjeId={selectedLijstje}
        />
      </div>
    );
  }
}

export default App;
