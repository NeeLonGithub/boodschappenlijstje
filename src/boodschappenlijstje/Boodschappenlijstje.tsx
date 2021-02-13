import React, { FC, useEffect, useState } from 'react';
import { AfstreepItem } from './afstreep-item/AfstreepItem';
import { Boodschappenlijst, listenToBoodschappenlijstje, stopListeningToBoodschappenLijstje } from '../resources/boodschappenlijstje.resource';

interface BoodschappenlijstjeProps {
  boodschappenlijstjeId: string;
}

export const Boodschappenlijstje: FC<BoodschappenlijstjeProps> = (
  { boodschappenlijstjeId }
) => {

  const [title, setTitle] = useState<string>('');
  const [boodschappen, setBoodschappen] = useState<string[]>([]);

  useEffect(() => {
    listenToBoodschappenlijstje(boodschappenlijstjeId, (boodschappenlijstje: Boodschappenlijst) => {
      setTitle(boodschappenlijstje.title);
      setBoodschappen(boodschappenlijstje.boodschappen)
    });
    return () => stopListeningToBoodschappenLijstje(boodschappenlijstjeId);
  }, [boodschappenlijstjeId]);

  return (
    <div>
      <h1>{title}</h1>
      {boodschappen.map((boodschapId) => {
        return (
          <AfstreepItem
            key={boodschapId}
            boodschapId={boodschapId}
          />
        );
      })}
    </div>
  );
};
