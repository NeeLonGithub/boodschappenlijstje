import { BoodschappenlijstjesOverview } from './boodschappenlijstjes-overview/BoodschappenlijstjesOverview';
import { EditBoodschappenlijstje } from './boodschappenlijstje/edit-boodschappenlijstje/EditBoodschappenlijstje';
import { Boodschappenlijstje } from './boodschappenlijstje/Boodschappenlijstje';
import React, { useEffect, useState } from 'react';

interface BoodschappenlijstjeAppProps {}

const BoodschappenlijstjeApp: React.FunctionComponent<BoodschappenlijstjeAppProps> = () => {

  const [selectedLijstje, setSelectedLijstje] = useState<string>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isOnStartPage, setIsOnStartPage] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, [isOnStartPage]);

  const onBackButtonEvent = () => {
    if (!isOnStartPage) {
      setSelectedLijstje(undefined);
      setIsOnStartPage(true);
    }
  }

  const pushToHistory = () => {
    setIsOnStartPage(false);
    window.history.pushState(null, '', window.location.pathname);
  }

  const mimicBackButton = () => {
    window.history.back();
  }

  const viewLijstje = (lijstjeId: string) => {
    pushToHistory();
    setEditMode(false);
    setSelectedLijstje(lijstjeId);
  };

  const editLijstje = (lijstjeId: string) => {
    pushToHistory();
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
        <button onClick={mimicBackButton}>Terug</button>
        {editMode ?
          <EditBoodschappenlijstje boodschappenlijstjeId={selectedLijstje}/> :
          <Boodschappenlijstje boodschappenlijstjeId={selectedLijstje}/>}
      </div>
    );
  }
};

export default BoodschappenlijstjeApp;
