import { deleteBoodschap } from '../../../resources/boodschap.resources';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DropResult } from 'react-beautiful-dnd';
import { EditableListItem } from '../editable-list-item/EditableListItem';
import { Boodschappenlijst, listenToBoodschappenlijstje, stopListeningToBoodschappenLijstje, updateBoodschappenlijstjeBoodschappen } from '../../../resources/boodschappenlijstje.resource';

interface DragDropEditableListItemsProps {
  boodschappenlijstjeId: string
}

const DragDropEditableListItems: React.FunctionComponent<DragDropEditableListItemsProps> = ({ boodschappenlijstjeId }) => {

  const [boodschapIds, setBoodschapIds] = useState<string[]>([]);

  useEffect(() => {
    listenToBoodschappenlijstje(boodschappenlijstjeId, (boodschappenlijstje: Boodschappenlijst) => {
      setBoodschapIds(boodschappenlijstje?.boodschappen || []);
    });
    return () => stopListeningToBoodschappenLijstje(boodschappenlijstjeId);
  }, [boodschappenlijstjeId]);

  const removeBoodschap = (index: number) => {
    let newBoodschapIds: string[] = [...boodschapIds];
    const [removedBoodschapId] = newBoodschapIds.splice(index, 1);
    updateBoodschappenlijstjeBoodschappen(boodschappenlijstjeId, newBoodschapIds);
    deleteBoodschap(removedBoodschapId);
  };

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return;
    const { source, destination } = result;
    const boodschapIdsCopy = [...boodschapIds];
    const [dragged] = boodschapIdsCopy.splice(source.index, 1);
    const newBoodschapIds = [...boodschapIdsCopy.slice(0,destination?.index), dragged, ...boodschapIdsCopy.slice(destination?.index)];
    updateBoodschappenlijstjeBoodschappen(boodschappenlijstjeId, newBoodschapIds);
  }

  return <DragDropContext onDragEnd={(result => onDragEnd(result))}>
    <Droppable droppableId={boodschappenlijstjeId}>
      {(provided) => {
        return <div {...provided.droppableProps} ref={provided.innerRef}>
          {boodschapIds.map(
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
};

export default DragDropEditableListItems;
