import React, { FC, useEffect, useState } from 'react';
import './AfstreepItem.scss';
import { Boodschap, listenToBoodschap, updateBoodschapIsChecked } from '../../resources/boodschap.resources';

interface AfstreepItemProps {
  boodschapId: string;
}

export const AfstreepItem: FC<AfstreepItemProps> = ({ boodschapId }) => {

  const [boodschap, setBoodschap] = useState<Boodschap>({} as Boodschap);

  useEffect(() => {
    listenToBoodschap(boodschapId, setBoodschap);
  }, [boodschapId]);

  const toggleBoodschap = () => {
    const setValue = !boodschap.isChecked;
    setBoodschap({...boodschap, isChecked: setValue});
    updateBoodschapIsChecked(boodschapId, setValue);
  };

  return (
    <div className={`afstreep-item`}>
      <div
        className={`afstreep-item__name ${boodschap.isChecked ? 'afstreep-item__name--checked' : ''}`}
        onClick={toggleBoodschap}>
        {boodschap.name}
      </div>
    </div>
  );
};
