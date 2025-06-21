/* eslint-disable prefer-const */
import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { updateTask,deleteTask } from "../../context/task/actions";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useProjectsState } from "../../context/projects/context";
import { TaskDetailsPayload } from "../../context/task/types";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { useMembersState } from "../../context/members/context";
import { useCommentDispatch, useCommentState } from "../../context/comment/context";
import { fetchComments, addComment } from "../../context/comment/actions";
import { Comment } from "../../context/comment/types";

const formatDateForPicker = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

type TaskFormUpdatePayload = TaskDetailsPayload & {
  selectedPerson: string;
};

const TaskDetails = () => {
  let [isOpen, setIsOpen] = useState(true);
  const { projectID, taskID } = useParams();
  const navigate = useNavigate();

  const projectState = useProjectsState();
  const taskListState = useTasksState();
  const memberState = useMembersState();
  const taskDispatch = useTasksDispatch();
  const commentDispatch = useCommentDispatch();
  const commentState = useCommentState();

  const selectedProject = projectState?.projects.find(
    (project) => `${project.id}` === projectID
  );

  const selectedTask = taskListState.projectData.tasks[taskID ?? ""];
  const [selectedPerson, setSelectedPerson] = useState(
    selectedTask.assignedUserName ?? ""
  );
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (projectID && taskID) {
      fetchComments(commentDispatch, projectID, taskID);
    }
  }, [ commentDispatch, projectID, taskID]);

  useEffect(() => {
    console.log("Comments fetched:", commentState.comments);
    setLocalComments(commentState.comments);
  }, [commentState.comments]);

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<TaskFormUpdatePayload>({
    defaultValues: {
      title: selectedTask.title,
      description: selectedTask.description,
      dueDate: formatDateForPicker(selectedTask.dueDate),
      selectedPerson: selectedTask.assignedUserName,
    },
  });

  if (!selectedProject) return <>No such Project!</>;

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
    const assignee = memberState?.members.find(
      (member) => member.name === selectedPerson
    );
    updateTask(taskDispatch, projectID ?? "", {
      ...selectedTask,
      ...data,
      assignee: assignee?.id,
    });
    closeModal();
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addComment(commentDispatch, projectID!, taskID!, newComment);
      setNewComment("");
      await fetchComments(commentDispatch, projectID!, taskID!);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for comments to update
      console.log("Comments after adding:", commentState.comments);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Task Details
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      required
                      placeholder="Enter title"
                      id="title"
                      {...register("title", { required: true })}
                      className="w-full border rounded-md py-2 px-3 my-4 text-gray-700"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Enter description"
                      id="description"
                      {...register("description", { required: true })}
                      className="w-full border rounded-md py-2 px-3 my-4 text-gray-700"
                    />
                    <input
                      type="date"
                      required
                      id="dueDate"
                      {...register("dueDate", { required: true })}
                      className="w-full border rounded-md py-2 px-3 my-4 text-gray-700"
                    />                  
                    <h3><strong>Assignee</strong></h3>
                    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                      <Listbox.Button className="w-full border rounded-md py-2 px-3 my-2 text-gray-700 text-base text-left">
                        {selectedPerson}
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {memberState?.members.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-blue-100 text-blue-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={person.name}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                    <CheckIcon className="h-5 w-5" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>

                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex justify-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                    >
                      Cancel
                    </button>
                  </form>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Comments</h4>
                    <ul className="space-y-2 max-h-48 overflow-y-auto">
                      {[...localComments].reverse().map((comment) => (
                        <li key={comment.id} className="border p-2 rounded-md">
                          <div className="text-sm text-gray-900 font-semibold">{comment.user_name}</div>
                          <div className="text-sm text-gray-700">{comment.description}</div>
                          <div className="text-xs text-gray-400">{formatDate(comment.created_at)}</div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <input
                        id="commentBox"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                      />
                      <button
                        id="addCommentBtn"
                        onClick={handleAddComment}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  id="deleteTaskBtn"
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={async (e) => {
                    e.stopPropagation(); // Stop bubbling to Link
                    e.preventDefault();  // Stop default link behavior
                    await deleteTask(taskDispatch, projectID ?? "", selectedTask);
                    navigate(`/projects/${projectID}`);
                  }}
                >Delete</button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskDetails;