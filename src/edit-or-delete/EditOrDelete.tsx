import React, { useState } from 'react';
import EditIcon from '../icons/edit-icon';
import DeleteIcon from '../icons/delete-icon';
import CancelIcon from '../icons/cancel-icon';
import './EditOrDelete.scss';

interface EditOrDeleteProps {
  onEdit: () => void;
  onDelete: () => void;
}

const EditOrDelete: React.FunctionComponent<EditOrDeleteProps> = ({onEdit, onDelete}) => {

  const [isOpenForDelete, setIsOpenForDelete] = useState(false);
  const [isActiveForDelete, setIsActiveForDelete] = useState(false);

  const onDeleteIconClick = () => {
    if (isActiveForDelete) {
      onDelete();
    } else {
      setIsOpenForDelete(true);
      setTimeout(() => setIsActiveForDelete(true), 850);
    }
  };

  const onCancelIconClick = () => {
    setIsOpenForDelete(false);
    setIsActiveForDelete(false);
  }

  return (
    <div className={'edit-or-delete'}>
      <button className={`edit${isOpenForDelete ? ' edit-hidden' : ''}`}
              onClick={() => onEdit()}>
        <EditIcon/>
      </button>
      <button className={`cancel${isOpenForDelete ? ' cancel-hidden' : ''}`}
              onClick={onCancelIconClick}>
        <CancelIcon/>
      </button>
      <button className={`delete${isOpenForDelete ? ' delete-open' : ''}${isActiveForDelete ? ' delete-active' : ''}`}
              onClick={onDeleteIconClick}>
        <DeleteIcon/>
      </button>
    </div>
  )
};

export default EditOrDelete;
