import React from "react";
import Task from "./Task";
import type { TaskItem } from "./types";

interface Props {
    tasks: TaskItem[];
    deleteItemTask : (id: number) => void;
}

interface State {}

const TaskList = (props: Props) => {
    const list = props.tasks.map((task, idx) => (
    <Task
    key={idx}
    item={task}
    deleteTask={() => props.deleteItemTask(idx)}
    />
    ));
    return <ul>{list}</ul>
}

export default TaskList;