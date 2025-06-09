import React from "react";
import type { TaskItem } from "./types";

interface TaskFormProps {
  addTask: (task: TaskItem) => void;
}

interface TaskFormState {
    title: string;
    dueDate: string;
    description: string;
}
class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
    inputRef = React.createRef<HTMLInputElement>();
    constructor(props: TaskFormProps) {
    super(props);
    this.state = {
      title: "",
      dueDate: "",
      description: "",
    }
  }
  
  addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (this.state.title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }
    if (this.state.dueDate.trim() === "") {
      alert("Due date cannot be empty");
      return;
    }
    const newTask = {
      title: this.state.title,
      dueDate: this.state.dueDate,
      description: this.state.description,
    };
    this.props.addTask(newTask);
    this.setState({ title: "", dueDate: "", description: "" });
  };
  titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
   console.log(`${event.target.value}`);
   this.setState({ title: event.target.value });
  };
  dueDateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(`${event.target.value}`);
    this.setState({ dueDate: event.target.value });
  };
  descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(`${event.target.value}`);
    this.setState({ description: event.target.value });
  }
  render(){
    return (
        <form onSubmit={this.addTask}>
        <input id="todoTitle" type="text" value={this.state.title} onChange={this.titleChanged}/>
        <input id="todoDueDate" type="date" value={this.state.dueDate} onChange={this.dueDateChanged} />
        <input id="todoDescription" type="text" value={this.state.description} onChange={this.descriptionChanged} />
        <button id="addTaskButton" type="submit">Add item</button>
        </form>
    )
  }
}
 export default TaskForm;