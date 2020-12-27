import { Boodschap } from '../App.model';

export interface BoodschappenlijstjeData {
  title: string;
  boodschappen: Boodschap[];
}

export interface BoodschappenlijstjeModel extends BoodschappenlijstjeData {
  updateLijstje: (title: string, boodschappen: Boodschap[]) => void;
}
