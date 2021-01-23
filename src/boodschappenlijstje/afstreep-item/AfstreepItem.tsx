import React, { FC } from 'react';
import './AfstreepItem.scss';

interface AfstreepItemProps {
  name: string;
  isChecked: boolean;
  onToggle: () => void;
}

export const AfstreepItem: FC<AfstreepItemProps> = ({ name, isChecked, onToggle }) => {
  return (
    <div className={`afstreep-item`}>
      <div
        className={`afstreep-item__name ${isChecked ? 'afstreep-item__name--checked' : ''}`}
        onClick={onToggle}>
        {name}
      </div>
    </div>
  );
};
