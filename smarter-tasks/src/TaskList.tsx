import Task from "./Task";
import type { TaskItem } from "./types";

interface Props {
    task: TaskItem[];
    onDelete: (id: string) => void;
}

//interface State {}

const TaskList = (props: Props) => {
  const list = <>
  {props.task.map((task) => (
    <Task key={task.id} item={task} onDelete={() => props.onDelete(task.id)} />
  ))}
  </>
    return <>{list}</>
}

export default TaskList;