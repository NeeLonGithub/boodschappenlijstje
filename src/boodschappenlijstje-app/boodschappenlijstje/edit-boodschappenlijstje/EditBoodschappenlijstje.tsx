import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DraggableProvided, DropResult } from 'react-beautiful-dnd';
import './EditBoodschappenlijstje.scss';
import { TextInputField } from '../../../components/text-input-field/TextInputField';
import { EditableTitle } from './editable-title/EditableTitle';
import { EditableListItem } from './editable-list-item/EditableListItem';
import {
  Boodschappenlijst,
  listenToBoodschappenlijstje,
  stopListeningToBoodschappenLijstje,
  updateBoodschappenlijstjeBoodschappen
} from '../../resources/boodschappenlijstje.resource';
import { Boodschap, createBoodschap, deleteBoodschap } from '../../resources/boodschap.resources';

interface EditBoodschappenlijstjeProps {
  boodschappenlijstjeId: string;
}

export const EditBoodschappenlijstje: FC<EditBoodschappenlijstjeProps> = (
  { boodschappenlijstjeId }
) => {

  const [boodschappen, setBoodschappen] = useState<string[]>([]);

  useEffect(() => {
    listenToBoodschappenlijstje(boodschappenlijstjeId, (boodschappenlijstje: Boodschappenlijst) => {
      setBoodschappen(boodschappenlijstje?.boodschappen || []);
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

  const removeBoodschap = (index: number) => {
    let newBoodschappen: string[] = [...boodschappen];
    const [removedBoodschapId] = newBoodschappen.splice(index, 1);
    updateBoodschappenlijstjeBoodschappen(boodschappenlijstjeId, newBoodschappen);
    deleteBoodschap(removedBoodschapId);
  };

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return;
    const { source, destination } = result;
    const boodschappenCopy = [...boodschappen];
    const [dragged] = boodschappenCopy.splice(source.index, 1);
    const newBoodschappen = [...boodschappenCopy.slice(0,destination?.index), dragged, ...boodschappenCopy.slice(destination?.index)];
    updateBoodschappenlijstjeBoodschappen(boodschappenlijstjeId, newBoodschappen);
  }

  return (
    <div>
      <EditableTitle boodschappenlijstjeId={boodschappenlijstjeId}/>
      <DragDropContext onDragEnd={(result => onDragEnd(result))}>
        <Droppable droppableId={boodschappenlijstjeId}>
          {(provided) => {
            return <div {...provided.droppableProps} ref={provided.innerRef}>
              {boodschappen.map(
                (boodschap, index) =>
                  <Draggable draggableId={boodschap} key={boodschap} index={index}>
                    {(provided: DraggableProvided) => (
                      <div ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}>
                        <EditableListItem boodschapId={boodschap} deleteItem={() => removeBoodschap(index)}/>
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
