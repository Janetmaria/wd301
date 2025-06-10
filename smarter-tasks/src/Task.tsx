//import React from "react";
import "./TaskCard.css";
import type { TaskItem } from "./types";

interface TaskProps {
    task: TaskItem;
    onDelete: () => void;
}
const Task = ({ task, onDelete }: TaskProps) => {
  return (
      <div className="TaskItem shadow-md border border-slate-100">
        <h2 className="text-base font-bold my-1">{task.title}</h2> 
        <p className="text-sm text-slate-500"> ({task.dueDate})</p>
        <p className="text-sm text-slate-500">Description: {task.description}</p>
        <button className="deleteTaskButton" onClick={onDelete}>Delete</button>
      </div>
    );
}

export default Task;