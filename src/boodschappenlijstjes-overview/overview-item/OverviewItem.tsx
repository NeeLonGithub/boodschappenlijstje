import React, { FC, useEffect, useState } from 'react';
import EditIcon from '../../icons/edit-icon';
import DeleteIcon from '../../icons/delete-icon';
import { Boodschappenlijst, listenToBoodschappenlijstje, stopListeningToBoodschappenLijstje } from '../../resources/boodschappenlijstje.resource';

interface OverviewItemProps {
  boodschappenlijstjeId: string;
  selectLijstje: () => void;
  editLijstje: () => void;
  deleteLijstje: () => void;
}

export const OverviewItem: FC<OverviewItemProps> = ({ boodschappenlijstjeId, selectLijstje, editLijstje, deleteLijstje }) => {

  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    listenToBoodschappenlijstje(boodschappenlijstjeId, (boodschappenlijstje: Boodschappenlijst) => {
      setTitle(boodschappenlijstje?.title || '');
    });
    return () => stopListeningToBoodschappenLijstje(boodschappenlijstjeId);
  }, [boodschappenlijstjeId]);

  return (<div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div className="boodschappenlijstjes-overview__clickable-text"
         onClick={() => selectLijstje()}>
      {title}
    </div>
    <div>
      <button
        onClick={() => editLijstje()}>
        <EditIcon/>
      </button>
      <button
        onClick={() => deleteLijstje()}>
        <DeleteIcon/>
      </button>
    </div>
  </div>);
}
