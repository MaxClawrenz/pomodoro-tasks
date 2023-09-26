import React, { useState } from "react"
import classes from '../pomodoro.module.css'
import PropTypes from 'prop-types';
import DropDownButton from "./DropDown/DropDownButton";
import TaskEditInput from "./TaskEditInput";

function Task(props){

    const [editing, setEditing] = useState(false);
   
    if(!editing){
        return (
                <li className={classes.Task}>
                <div className={classes.taskElem}>
                    <div className={classes.taskLeft}>
                        <div className={classes.pomodoroCount}>{props.pomodoro}</div>
                        <span className={classes.taskTitle}>{props.name}</span>
                    </div>
                    <DropDownButton setEditing={setEditing} id={props.id} weight={props.weight}/>
                </div>
            </li>
        )
    }else{
        return <TaskEditInput id={props.id} name={props.name} setEditing={setEditing}/>
    }
}

Task.propTypes = {
    name: PropTypes.string.isRequired,
    pomodoro: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
}


export default Task