import { BoodschappenlijstjesOverview } from './boodschappenlijstjes-overview/BoodschappenlijstjesOverview';
import { EditBoodschappenlijstje } from './boodschappenlijstje/edit-boodschappenlijstje/EditBoodschappenlijstje';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import React, { useState } from 'react';

interface BoodschappenlijstjeAppProps {}

const BoodschappenlijstjeApp: React.FunctionComponent<BoodschappenlijstjeAppProps> = () => {

  const [selectedLijstje, setSelectedLijstje] = useState<string>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const viewLijstje = (lijstjeId: string) => {
    setEditMode(false);
    setSelectedLijstje(lijstjeId);
  };

  const editLijstje = (lijstjeId: string) => {
    setEditMode(true);
    setSelectedLijstje(lijstjeId);
  };

  if (!selectedLijstje) {
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
};

export default BoodschappenlijstjeApp;