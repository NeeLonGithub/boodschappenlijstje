import React, { FC, useEffect, useState } from 'react';
import { TextInputField } from '../../../../components/text-input-field/TextInputField';
import { Boodschap, listenToBoodschap, stopListeningToBoodschap, updateBoodschapIsChecked, updateBoodschapName } from '../../../resources/boodschap.resources';
import EditOrDelete from '../../../edit-or-delete/EditOrDelete';
import './EditableListItem.scss';

interface EditableListItemProps {
  boodschapId: string;
  deleteItem: () => void;
}

export const EditableListItem: FC<EditableListItemProps> = ({ boodschapId, deleteItem }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [boodschap, setBoodschap] = useState<Boodschap>({} as Boodschap);

  useEffect(() => {
    listenToBoodschap(boodschapId, setBoodschap);
    return () => stopListeningToBoodschap(boodschapId);
  }, [boodschapId]);

  const handleInputChange = (name: string) => {
    if (name) {
      updateBoodschap(name);
    } else {
      deleteItem();
    }
  };

  const updateBoodschap = (name: string) => {
    setIsEditing(false);
    updateBoodschapName(boodschapId, name);
    updateBoodschapIsChecked(boodschapId, false);
  };

  const renderEditListItem = (boodschap: Boodschap) => {
    return (<TextInputField
        className={'list-item-input'}
        text={boodschap.name}
        onChange={handleInputChange}
      />
    );
  };

  const renderListItem = (boodschap: Boodschap) => {
    return (
      <div className={'list-item-editable'}>
        <div style={{ padding: '0 0 2px 3px' }}>{boodschap.name}</div>
        <EditOrDelete onEdit={() => setIsEditing(true)} onDelete={deleteItem} />
      </div>
    );
  };

  if (isEditing) {
    return renderEditListItem(boodschap);
  } else {
    return renderListItem(boodschap);
  }
};
