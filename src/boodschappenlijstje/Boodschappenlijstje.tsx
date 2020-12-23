import React from 'react';
import { AfstreepItemModel } from '../afstreep-item/AfstreepItem.model';
import { AfstreepItem } from '../afstreep-item/AfstreepItem';
import { BoodschappenlijstjeModel } from './Boodschappenlijstje.model';

export class Boodschappenlijstje extends React.Component<BoodschappenlijstjeModel> {

  public toggleBoodschap = (index: number) => {
    const newBoodschappen = this.props.boodschappen.map((boodschap, i) => {
      return i !== index ? boodschap : { ...boodschap, isChecked: !boodschap.isChecked };
    });
    this.props.updateLijstje(this.props.title, newBoodschappen);
  };

  public render() {
    const afstreepItems: AfstreepItemModel[] = this.props.boodschappen.map(
      (boodschap, index) => ({ ...boodschap, onClick: () => this.toggleBoodschap(index) })
    );
    return (
      <div>
        <h1>{this.props.title}</h1>
        {afstreepItems.map((afstreepItem) => {
          return (<AfstreepItem
            key={afstreepItem.name}
            name={afstreepItem.name}
            isChecked={afstreepItem.isChecked}
            onClick={afstreepItem.onClick}
          ></AfstreepItem>);
        })}
      </div>
    );
  }
}
