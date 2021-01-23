import React, { FC } from 'react';
import { AfstreepItem } from './afstreep-item/AfstreepItem';
import { Boodschap } from '../App.model';

interface BoodschappenlijstjeProps {
  title: string;
  boodschappen: Boodschap[];
  updateBoodschappen: (boodschappen: Boodschap[]) => void;
}

export const Boodschappenlijstje: FC<BoodschappenlijstjeProps> = (
  { title, boodschappen = [], updateBoodschappen }
) => {

  const toggleBoodschap = (index: number) => {
    const newBoodschappen = boodschappen.map((boodschap, i) => {
      return i !== index ? boodschap : { ...boodschap, isChecked: !boodschap.isChecked };
    });
    updateBoodschappen(newBoodschappen);
  };

  return (
    <div>
      <h1>{title}</h1>
      {boodschappen.map((boodschap, index) => {
        return (
          <AfstreepItem
            key={boodschap.name}
            name={boodschap.name}
            isChecked={boodschap.isChecked}
            onToggle={() => toggleBoodschap(index)}
          />
        );
      })}
    </div>
  );
};
