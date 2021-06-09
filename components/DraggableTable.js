import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableTable = ({ data }) => {
  const [list, setList] = useState(data);

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
    console.log(list);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="data">
        {(provided) => (
          <ul
            className="data w-11/12 mx-auto mt-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map(({ name, team, id }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      className={`text-center bg-black flex w-full justify-around my-2 ${
                        snapshot.isDragging && "border border-white"
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p className="w-1/12">
                        <i className="fas fa-grip-lines"></i>
                      </p>
                      <p className="w-1/12">{index + 1}</p>
                      <p className="w-8/12">{name}</p>
                      <p className="w-2/12">{team}</p>
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
