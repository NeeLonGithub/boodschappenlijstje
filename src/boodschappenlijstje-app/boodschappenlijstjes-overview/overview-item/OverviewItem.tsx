import React, { FC, useEffect, useState } from 'react';
import './OverviewItem.scss';
import { Boodschappenlijst, listenToBoodschappenlijstje, stopListeningToBoodschappenLijstje } from '../../resources/boodschappenlijstje.resource';
import EditOrDelete from '../../edit-or-delete/EditOrDelete';

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

  return (
    <div className="boodschappenlijstjes-overview-item">
      <div className="boodschappenlijstjes-overview__clickable-text"
           onClick={() => selectLijstje()}>
        {title}
      </div>
      <EditOrDelete onEdit={editLijstje} onDelete={deleteLijstje} />
    </div>
  );
}
