import React, { useEffect, useState } from 'react';
import { EditableTitle } from './editable-title/EditableTitle';
import DragDropEditableListItems from './drag-drop-editable-list-items/DragDropEditableListItems';
import { TextInputField } from '../../../components/text-input-field/TextInputField';
import {
  Boodschappenlijst,
  listenToBoodschappenlijstje,
  stopListeningToBoodschappenLijstje,
  updateBoodschappenlijstjeBoodschappen
} from '../../resources/boodschappenlijstje.resource';
import { Boodschap, createBoodschap } from '../../resources/boodschap.resources';

interface EditBoodschappenlijstjeProps {
  boodschappenlijstjeId: string;
}

export const EditBoodschappenlijstje: React.FunctionComponent<EditBoodschappenlijstjeProps> = (
  { boodschappenlijstjeId }
) => {

  const [boodschapIds, setBoodschapIds] = useState<string[]>([]);

  useEffect(() => {
    listenToBoodschappenlijstje(boodschappenlijstjeId, (boodschappenlijstje: Boodschappenlijst) => {
      setBoodschapIds(boodschappenlijstje?.boodschappen || []);
    });
    return () => stopListeningToBoodschappenLijstje(boodschappenlijstjeId);
  }, [boodschappenlijstjeId]);

  const addBoodschap = (name: string) => {
    if (name) {
      const newBoodschap: Boodschap = { parentId: boodschappenlijstjeId, name: name, isChecked: false };
      const boodschapId: string = createBoodschap(newBoodschap);
      const newBoodschapIds = [...boodschapIds, boodschapId];
      updateBoodschappenlijstjeBoodschappen(boodschappenlijstjeId, newBoodschapIds);
    }
  };

  return (
    <div>
      <EditableTitle boodschappenlijstjeId={boodschappenlijstjeId}/>
      <DragDropEditableListItems boodschappenlijstjeId={boodschappenlijstjeId}/>
      <TextInputField text='' onChange={addBoodschap} className={'list-item-input'}/>
    </div>
  );
};
