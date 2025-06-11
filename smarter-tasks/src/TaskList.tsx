import Task from "./Task";
import type { TaskItem } from "./types";

interface Props {
    task: TaskItem[];
    onDelete: (id: string) => void;
}

//interface State {}

const TaskList = (props: Props) => {
    const list = <ul>{props.task.map((task) => (
    <li key={task.id}>
    <Task item={task} onDelete={() => props.onDelete(task.id)}
    />
    </li>
    ))}
    </ul>
    return <>{list}</>
}

export default TaskList;