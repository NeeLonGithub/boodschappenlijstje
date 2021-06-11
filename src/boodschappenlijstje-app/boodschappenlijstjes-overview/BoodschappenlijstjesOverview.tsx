import React, { FC, useEffect, useState } from 'react';
import './BoodschappenlijstjesOverview.scss';
import { listenToBoodschappenlijstjes, stopListeningToBoodschappenLijstjes, createBoodschappenlijstje, deleteBoodschappenlijstje } from '../resources/boodschappenlijstje.resource';
import { listenToListOrder, stopListeningToListOrder, updateListOrder } from '../resources/listOrder.resources';
import { OverviewItem } from './overview-item/OverviewItem';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DropResult } from 'react-beautiful-dnd';

interface BoodschappenlijstjesOverviewProps {
  selectLijstje: (lijstjeId: string) => void;
  editLijstje: (lijstjeId: string) => void;
}

export const BoodschappenlijstjesOverview: FC<BoodschappenlijstjesOverviewProps> = ({ selectLijstje, editLijstje }) => {

  const [boodschappenlijstjes, setBoodschappenlijstjes] = useState<string[]>([]);
  const [orderedLists, setOrderedLists] = useState<string[]>([]);

  useEffect(() => {
    listenToListOrder(lists => {
      setOrderedLists(lists || []);
    });
    listenToBoodschappenlijstjes(lijstjes => {
      setBoodschappenlijstjes(lijstjes || []);
    });
    return () => {
      stopListeningToBoodschappenLijstjes();
      stopListeningToListOrder();
    };
  }, []);

  useEffect(() => {
    setOrderedLists((lists) => {
      const knownLists = lists.filter((list) => boodschappenlijstjes.includes(list));
      const newLists = boodschappenlijstjes.filter((list) => !knownLists.includes(list));
      return [...knownLists, ...newLists];
    });
  }, [boodschappenlijstjes]);

  const createLijstje = () => {
    const newLijstjeId: string = createBoodschappenlijstje();
    editLijstje(newLijstjeId);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    const orderedListCopy = [...orderedLists];
    const [dragged] = orderedListCopy.splice(source.index, 1);
    const newOrderedLists = [...orderedListCopy.slice(0, destination?.index), dragged, ...orderedListCopy.slice(destination?.index)];
    updateListOrder(newOrderedLists);
  };

  return (
    <div className="boodschappenlijstjes-overview">
      <h1 className={"centered-title"}>Appointments</h1>
      <div onClick={() => createLijstje()} className="boodschappenlijstjes-overview__clickable-text boodschappenlijstjes-overview__text-button">New appointment...</div>

      <DragDropContext onDragEnd={(result => onDragEnd(result))}>
        <Droppable droppableId={'boodschappenlijstjes'}>
          {(provided) => {
            return <div {...provided.droppableProps} ref={provided.innerRef}>
              {orderedLists.map(
                (lijstjeId, index) =>
                  <Draggable draggableId={lijstjeId} key={lijstjeId} index={index}>
                    {(provided: DraggableProvided) => (
                      <div ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}>
                        <OverviewItem key={lijstjeId}
                                      boodschappenlijstjeId={lijstjeId}
                                      selectLijstje={() => selectLijstje(lijstjeId)}
                                      editLijstje={() => editLijstje(lijstjeId)}
                                      deleteLijstje={() => deleteBoodschappenlijstje(lijstjeId)}/>
                      </div>)}
                  </Draggable>
              )}
              {provided.placeholder}
            </div>;
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
