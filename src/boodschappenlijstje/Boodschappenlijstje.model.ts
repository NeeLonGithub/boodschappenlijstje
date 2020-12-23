import { Boodschap } from '../App.model';

export interface BoodschappenlijstjeModel {

  title: string;
  boodschappen: Boodschap[];
  updateLijstje: (title: string, boodschappen: Boodschap[]) => void;
}
