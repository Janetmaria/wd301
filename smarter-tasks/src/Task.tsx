import "./TaskCard.css";
import type { TaskItem } from "./types";
import { Link } from "react-router-dom";

interface TaskProps {
  item: TaskItem;
  onDelete: () => void;
}

const Task = (props: TaskProps) => {
  const { item, onDelete } = props;
  return (
    <div className="TaskItem shadow-md border border-slate-100">
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div>
          <Link to={`/tasks/${item.id}`}>
            <h2 className="text-base font-bold my-1">{item.title}</h2>
          </Link>
          <p className="text-sm text-slate-500">{item.dueDate}</p>
          <p className="text-sm text-slate-500">
            Description: {item.description}
          </p>
        </div>
        <button
          className="deleteTaskButton cursor-pointer flex items-center justify-center h-4 w-4 rounded-full my-5 mr-5"
          onClick={onDelete}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Task;