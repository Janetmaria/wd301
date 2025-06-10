import Task from "./Task";
import type { TaskItem } from "./types";

interface Props {
    tasks: TaskItem[];
    handleDeleteTask : (id: string) => void;
}

//interface State {}

const TaskList = (props: Props) => {
    const list = <ul>{props.tasks.map((task) => (
    <li className="TaskItem" key={task.id}>
    <Task {...task}
    />
    <button className="deleteTaskButton" onClick={() => props.handleDeleteTask(task.id)}>Delete</button>
    </li>
    ))}
    </ul>
    return <>{list}</>
}

export default TaskList;