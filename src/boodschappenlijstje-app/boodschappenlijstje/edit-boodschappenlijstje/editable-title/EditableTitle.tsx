import React, { FC, useEffect, useState } from 'react';
import { TextInputField } from '../../../../components/text-input-field/TextInputField';
import { Boodschappenlijst, listenToBoodschappenlijstje, stopListeningToBoodschappenLijstje, updateBoodschappenlijstjeTitle } from '../../../resources/boodschappenlijstje.resource';

interface EditableTitleProps {
  boodschappenlijstjeId: string;
}

export const EditableTitle: FC<EditableTitleProps> = ({ boodschappenlijstjeId}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    listenToBoodschappenlijstje(boodschappenlijstjeId, (boodschappenlijstje: Boodschappenlijst) => {
      let title: string = boodschappenlijstje?.title;
      if (!title) {
        title = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });
        updateBoodschappenlijstjeTitle(boodschappenlijstjeId, title);
      }
      setTitle(title);
    });
    return () => stopListeningToBoodschappenLijstje(boodschappenlijstjeId);
  }, [boodschappenlijstjeId]);

  const handleTitleUpdate = (title: string) => {
    updateBoodschappenlijstjeTitle(boodschappenlijstjeId, title);
    setIsEditing(false);
  };

  const renderEditTitle = () => {
    return (
      <TextInputField
        text={title}
        size={'large'}
        onChange={(title: string) => handleTitleUpdate(title)}
      />
    );
  };

  const renderTitleWithEdit = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ padding: '0 0 0 3px' }}>{title}</h1>
        &nbsp;(<span onClick={() => setIsEditing(true)} className="text-button">edit</span>)
      </div>
    );
  };

  return (
    <div>
      {isEditing ? renderEditTitle() : renderTitleWithEdit()}
    </div>
  );
};
