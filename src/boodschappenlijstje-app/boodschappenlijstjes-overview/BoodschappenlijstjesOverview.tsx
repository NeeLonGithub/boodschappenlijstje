import React, { FC, useEffect, useState } from 'react';
import './BoodschappenlijstjesOverview.scss';
import { createBoodschappenlijstje, deleteBoodschappenlijstje } from '../resources/boodschappenlijstje.resource';
import { listenToBoodschappenlijstjes, stopListeningToBoodschappenLijstjes, updateBoodschappenLijstjes } from '../resources/boodschappenlijstjes.resource';
import { OverviewItem } from './overview-item/OverviewItem';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DropResult } from 'react-beautiful-dnd';

interface BoodschappenlijstjesOverviewProps {
  selectLijstje: (lijstjeId: string) => void;
  editLijstje: (lijstjeId: string) => void;
}

export const BoodschappenlijstjesOverview: FC<BoodschappenlijstjesOverviewProps> = ({ selectLijstje, editLijstje }) => {

  const [boodschappenlijstjes, setBoodschappenlijstjes] = useState<string[]>([]);

  useEffect(() => {
    listenToBoodschappenlijstjes(lijstjes => {
      setBoodschappenlijstjes(lijstjes || []);
    });
    return () => stopListeningToBoodschappenLijstjes();
  }, [selectLijstje]);

  const createLijstje = () => {
    const newLijstjeId: string = createBoodschappenlijstje();
    const newBoodschappenlijstjes = [...boodschappenlijstjes, newLijstjeId];
    updateBoodschappenLijstjes(newBoodschappenlijstjes);
    editLijstje(newLijstjeId);
  }

  const deleteLijstje = (index: number) => {
    const newLijstjes: string[] = [...boodschappenlijstjes];
    const [removedLijstjeId] = newLijstjes.splice(index, 1);
    setBoodschappenlijstjes(newLijstjes);
    updateBoodschappenLijstjes(newLijstjes);
    deleteBoodschappenlijstje(removedLijstjeId);
  }

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return;
    const { source, destination } = result;
    const lijstjesCopy = [...boodschappenlijstjes];
    const [dragged] = lijstjesCopy.splice(source.index, 1);
    const newBoodschappen = [...lijstjesCopy.slice(0,destination?.index), dragged, ...lijstjesCopy.slice(destination?.index)];
    updateBoodschappenLijstjes(newBoodschappen);
  }

  return (
    <div className="boodschappenlijstjes-overview">
      <h1>Boodschappenlijstjes</h1>
      <div onClick={() => createLijstje()} className="boodschappenlijstjes-overview__clickable-text boodschappenlijstjes-overview__text-button">Maak een nieuw lijstje...</div>

      <DragDropContext onDragEnd={(result => onDragEnd(result))}>
        <Droppable droppableId={'boodschappenlijstjes'}>
          {(provided) => {
            return <div {...provided.droppableProps} ref={provided.innerRef}>
              {boodschappenlijstjes.map(
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
                                      deleteLijstje={() => deleteLijstje(index)} />
                      </div>)}
                  </Draggable>
              )}
              {provided.placeholder}
            </div>
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
