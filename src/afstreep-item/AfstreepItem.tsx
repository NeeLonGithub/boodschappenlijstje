import React from 'react';
import { AfstreepItemModel } from './AfstreepItem.model';
import './AfstreepItem.scss';

export class AfstreepItem extends React.Component<AfstreepItemModel> {
  public render() {
    return (
      <div
        className={`afstreep-item ${this.props.isChecked ? 'checked' : ''}`}
        onClick={this.props.onClick}>
        {this.props.name}
      </div>
    );
  }
}
