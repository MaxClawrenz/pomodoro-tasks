import React, { useContext, useEffect, useRef, useState } from "react"
import classes from '../pomodoro.module.css'
import PropTypes from 'prop-types'
import { TaskContext } from "../context/TaskContext";

function TaskEditInput(props){

    const [newName, setNewName] = useState(props.name);
    const ref = useRef(null);
    const { setTasks } = useContext(TaskContext)

    useEffect(()=>{
        if(ref){
            ref.current.focus();
        }
    },[])

    function handleChangeName(event){
        setNewName(event.target.value);
    }

    function handleSubmit(){
        setTasks(tasks => tasks.map(task => {
            if(task.id === props.id){
                return {
                    ...task,
                    name: newName,
                }
            }
            return task
        }))
        props.setEditing(false);
    }

    return (
        <div className={classes.TaskEditBlock}>
            <input ref={ref} className={classes.TaskEditInput} value={newName} onChange={handleChangeName} type="text" />
            <button className={classes.TaskEditAccept} onClick={handleSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A8B64F"></path>
                </svg>
            </button>
        </div>
    )
}

TaskEditInput.propTypes = {
    name: PropTypes.string.isRequired,
    setEditing: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}

export default TaskEditInput