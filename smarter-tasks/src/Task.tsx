import React from "react";
import "./TaskCard.css";
import type { TaskItem } from "./types";

interface TaskProp {
    item: TaskItem
    deleteTask : (task: TaskItem) => void;
}
const Task = (props: TaskProp) => {
  const {item, deleteTask} = props;
  return (
    <li>
      <div className="TaskItem shadow-md border border-slate-100">
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div>
            <a href={`/tasks/${item.id || ""}`}>
            <h2 className="text-base font-bold my-1">{item.title}</h2> 
            </a>
            <p className="text-sm text-slate-500"> ({item.dueDate})</p>
            <p className="text-sm text-slate-500">
            Description: {item.description}
            </p>
          </div>
          <button className="deleteTaskButton text-sm text-slate-500 border-slate-100" onClick={() => deleteTask(item)}>
            Delete</button>
        </div>
        </div>
      </li>
    );
}

export default Task;