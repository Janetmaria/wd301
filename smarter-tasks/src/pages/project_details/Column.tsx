import Task from "./Task";
import { ColumnData, TaskDetails } from "../../context/task/types";
import { Droppable } from "react-beautiful-dnd";
import React, { forwardRef } from "react";

// A component to render the title, which will be included as <Title>This is a sample title</Title>
const Title = (props: React.PropsWithChildren) => {
  return <h3 className="p-2 font-semibold">{props.children}</h3>;
};

const TaskList = forwardRef<HTMLDivElement | null, React.PropsWithChildren>(
  (props: React.PropsWithChildren, ref) => {
    return (
      <div ref={ref} className="grow min-h-100 dropArea" {...props}>
        {props.children}
      </div>
    );
  }
);

interface Props {
  column: ColumnData;
  tasks: TaskDetails[];
}

const Column: React.FC<Props> = (props) => {
  return (
    <div className="rounded-md bg-gray-100 p-2">
      <Title>{props.column.title}</Title>
      <Droppable
        droppableId={props.column.id}
        isDropDisabled={false}  // Ensure this is a boolean
        isCombineEnabled={false}  // Ensure this is a boolean
        ignoreContainerClipping={false}  // Ensure this is a boolean
      >
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
