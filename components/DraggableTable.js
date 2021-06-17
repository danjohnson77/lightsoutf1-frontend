import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableTable = ({ list = [], setList }) => {
  const isEven = (value) => {
    if (value % 2 == 0) return true;
    else return false;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
    console.log("new list", list);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="data">
        {(provided) => (
          <ul
            className="data mt-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map(({ name, team, id }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      className={`text-center bg-black flex flex-col lg:flex-row w-full justify-around my-2 ${
                        snapshot.isDragging && "border border-white"
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p className="lg:w-1/12 hidden lg:block">
                        <i className="fas fa-grip-lines"></i>
                      </p>
                      <p className="lg:w-1/12">{index + 1}</p>
                      <p className="lg:w-8/12">{name}</p>
                      <p className="lg:w-2/12">{team}</p>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTable;
