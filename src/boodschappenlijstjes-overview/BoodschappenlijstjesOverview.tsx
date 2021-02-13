import React, { FC, useEffect, useState } from 'react';
import './BoodschappenlijstjesOverview.scss';
import { Boodschappenlijst } from '../resources/boodschappenlijstje.resource';
import { listenToBoodschappenlijstjes, stopListeningToBoodschappenLijstjes } from '../resources/boodschappenlijstjes.resource';

interface BoodschappenlijstjesOverviewProps {
  selectLijstje: (lijstjeId: string) => void;
}

export const BoodschappenlijstjesOverview: FC<BoodschappenlijstjesOverviewProps> = ({ selectLijstje }) => {

  const [boodschappenlijstjes, setBoodschappenlijstjes] = useState<{ [listId: string]: Boodschappenlijst }>({});

  useEffect(() => {
    listenToBoodschappenlijstjes(lijstjes => {
      setBoodschappenlijstjes(lijstjes);
      if (Object.keys(lijstjes).length === 1) {
        selectLijstje(Object.keys(lijstjes)[0]);
      }
    });
    return () => stopListeningToBoodschappenLijstjes();
  }, [selectLijstje]);

  return (
    <div className="boodschappenlijstjes-overview">
      <h1>Boodschappenlijstjes</h1>
      {Object.entries(boodschappenlijstjes).map(
        ([lijstjeId, lijstje]) => (
          <div key={lijstje.title} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="boodschappenlijstjes-overview__clickable-text"
                 onClick={() => selectLijstje(lijstjeId)}>
              {lijstje.title}
            </div>
          </div>
        )
      )}
    </div>
  );
};
