import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DraggableProvided, DropResult } from 'react-beautiful-dnd';
import './EditBoodschappenlijstje.scss';
import { TextInputField } from './text-input-field/TextInputField';
import { EditableTitle } from './editable-title/EditableTitle';
import { EditableListItem } from './editable-list-item/EditableListItem';
import {
  Boodschappenlijst,
  listenToBoodschappenlijstje,
  stopListeningToBoodschappenLijstje,
  updateBoodschappenlijstjeBoodschappen,
  updateBoodschappenlijstjeTitle
} from '../../resources/boodschappenlijstje.resource';
import { Boodschap, createBoodschap, deleteBooschap } from '../../resources/boodschap.resources';

interface EditBoodschappenlijstjeProps {
  boodschappenlijstjeId: string;
}

export const EditBoodschappenlijstje: FC<EditBoodschappenlijstjeProps> = (
  { boodschappenlijstjeId }
) => {

  const [boodschappen, setBoodschappen] = useState<string[]>([]);

  useEffect(() => {
    listenToBoodschappenlijstje(boodschappenlijstjeId, (boodschappenlijstje: Boodschappenlijst) => {
      if (!boodschappenlijstje.title) {
        const title = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });
        updateBoodschappenlijstjeTitle(boodschappenlijstjeId, title);
      }
      setBoodschappen(boodschappenlijstje.boodschappen);
    });
    return () => stopListeningToBoodschappenLijstje(boodschappenlijstjeId);
  }, [boodschappenlijstjeId]);

  const addBoodschap = (name: string) => {
    if (name) {
      const newBoodschap: Boodschap = { name: name, isChecked: false };
      const boodschapId: string = createBoodschap(newBoodschap);
      const newBoodschappen = [...boodschappen, boodschapId];
      updateBoodschappenlijstjeBoodschappen(boodschappenlijstjeId, newBoodschappen);
    }
  };

  const deleteBoodschap = (index: number) => {
    let newBoodschappen: string[] = [...boodschappen];
    const [removedBoodschaId] = newBoodschappen.splice(index, 1);
    updateBoodschappenlijstjeBoodschappen(boodschappenlijstjeId, newBoodschappen);
    deleteBooschap(removedBoodschaId);
  };

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return;
    const { source, destination } = result;
    const boodschappenCopy = [...boodschappen];
    const [removed] = boodschappenCopy.splice(source.index, 1);
    const newBoodschappen = [...boodschappenCopy.slice(0,destination?.index), removed, ...boodschappenCopy.slice(destination?.index)];
    updateBoodschappenlijstjeBoodschappen(boodschappenlijstjeId, newBoodschappen);
  }

  return (
    <div>
      <EditableTitle boodschappenlijstjeId={boodschappenlijstjeId}/>
      <DragDropContext onDragEnd={(result => onDragEnd(result))}>
        <Droppable droppableId={boodschappenlijstjeId}>
          {(provided, snapshot) => {
            return <div {...provided.droppableProps} ref={provided.innerRef}>
              {boodschappen.map(
                (boodschap, index) =>
                  <Draggable draggableId={boodschap} key={boodschap} index={index}>
                    {(provided: DraggableProvided) => (
                      <div ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}>
                        <EditableListItem boodschapId={boodschap} deleteItem={() => deleteBoodschap(index)}/>
                      </div>)}
                  </Draggable>
              )}
              {provided.placeholder}
            </div>
          }}
        </Droppable>
      </DragDropContext>
      <TextInputField text='' onChange={name => addBoodschap(name)}/>
    </div>
  );
};
