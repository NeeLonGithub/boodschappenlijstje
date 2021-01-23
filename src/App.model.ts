export interface Boodschap {
  name: string;
  isChecked: boolean;
}

export interface BoodschappenlijstjeData {
  title: string;
  boodschappen: Boodschap[];
}
