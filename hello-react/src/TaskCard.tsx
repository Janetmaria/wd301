import React from 'react'
import './TaskCard.css'

const TaskCard = (props) => {
    console.log(props)
    if(!props.dueDate) {
        return (
            <div className='TaskItem'>
                <h2 className="text-xl font-bold">{props.title}</h2>
                <p>Completed on: {props.completedAtDate}</p>
                <p>Assignee: {props.assigneeName}</p>
            </div>
        )
    } 
    if(!props.completedAtDate) {
        return (
            <div className='TaskItem'>
                <h2 className="text-xl font-bold">{props.title}</h2>
                <p>Due on: {props.dueDate}</p>
                <p>Assignee: {props.assigneeName}</p>
            </div>
        )
    }

}
export default TaskCard