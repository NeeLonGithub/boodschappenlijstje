import React from 'react';
import { AfstreepItemModel } from '../afstreep-item/AfstreepItem.model';
import { AfstreepItem } from '../afstreep-item/AfstreepItem';

export class Boodschappenlijstje extends React.Component<{ titel: string, afstreepItems: AfstreepItemModel[] }> {
  public render() {
    const afstreepItems: AfstreepItemModel[] = this.props.afstreepItems;
    return (
      <div>
        <h1>{this.props.titel}</h1>
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
