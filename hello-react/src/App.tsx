import React from "react";
import TaskCard from "./TaskCard"

function App() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div className="border rounded p-4 border-lime-700">
        <h1>Pending</h1>
        <TaskCard title="Build the website with static content" dueDate="10th April" assigneeName="Rohit S"/>
        <TaskCard title="Add Blog" dueDate="22nd March" assigneeName="Rohit M"/>
      </div>
      <div className="border rounded p-4 border-lime-700">
        <h1>Done</h1>
        <TaskCard title="Design the mockup" completedAtDate="10th April" assigneeName="Rohit M"/>
        <TaskCard title="Get approval from principal" completedAtDate="20th April" assigneeName="Ajay S"/>
      </div>
    </div>
  )
}
export default App
