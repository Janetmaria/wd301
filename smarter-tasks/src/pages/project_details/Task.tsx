import { TaskDetails } from "../../context/task/types";
import "./TaskCard.css";
import { Link, useParams } from "react-router-dom";
import { useTasksDispatch } from "../../context/task/context";
import { deleteTask } from "../../context/task/actions";
import React from "react";

const Task = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ task: TaskDetails }>
>((props, ref) => {
  const { task } = props;
  const { projectID } = useParams();
  const taskDispatch = useTasksDispatch();

  return (
    <div ref={ref} className="m-2 flex">
      <div className="TaskItem w-full shadow-md border border-slate-100 bg-white relative">
        <Link to={`/account/projects/${projectID}/tasks/${task.id}`} className="block p-4">
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div>
              <h2 className="text-base font-bold my-1">{task.title}</h2>
              <p className="text-sm text-slate-500">
                {new Date(task.dueDate).toDateString()}
              </p>
              <p className="text-sm text-slate-500">
                Description: {task.description}
              </p>
              <p className="text-sm text-slate-500">
                Assignee: {task.assignedUserName ?? "-"}
              </p>
            </div>
          </div>
        </Link>

        {/* Delete button outside the Link */}
        <button
          id="deleteTaskBtn"
          className="absolute top-2 right-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Stop bubbling to Link
            e.preventDefault();  // Stop default link behavior
            deleteTask(taskDispatch, projectID ?? "", task);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 fill-red-200 hover:fill-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default Task;
