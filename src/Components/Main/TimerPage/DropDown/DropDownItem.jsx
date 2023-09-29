import React, { useContext } from "react"
import classes from '../../../../pomodoro.module.css'
import PropTypes from 'prop-types';
import {TaskContext} from '../../../../context/TaskContext'


function DropDownItem(props){
    
    const { setTasks } = useContext(TaskContext);
    

    function handleFunctional(){
        
        if(props.functional === 'increase'){
            setTasks(tasks => tasks.map(task => {
                if(task.id === props.id){
                    let pomodoroOnlyTasks = task.allPomodoros.filter(task => task.type === 'pomodoro');
                    let pomodoroNumber = pomodoroOnlyTasks.length + 1;
                    let allPomodorosNew = task.allPomodoros;
                    let newPomodoro = {number: pomodoroNumber, status: 'ready', type: 'pomodoro', timeStart: 0, timeFinish: 0};
                    let newBreak = {number: pomodoroNumber, status: 'ready', type: 'break', timeStart: 0, timeFinish: 0}
                    allPomodorosNew.push(newPomodoro);
                    allPomodorosNew.push(newBreak);
                    return {
                        ...task,
                        pomodoro: task.pomodoro + 1,
                        weight: task.weight + 25,
                        allPomodoros: allPomodorosNew
                    }
                }
                return task
            }))
        }else if(props.functional === 'decrease' && props.weight > 25){
            setTasks(tasks => tasks.map(task => {
                if(task.id === props.id){
                    let pomodoroOnlyTasks = task.allPomodoros.filter(task => task.type === 'pomodoro');
                    let pomodoroNumber = pomodoroOnlyTasks.length;
                    let allPomodorosNew = task.allPomodoros;
                    allPomodorosNew = allPomodorosNew.filter(pomodor => pomodor.number !== pomodoroNumber);
                    return {
                        ...task,
                        pomodoro: task.pomodoro - 1,
                        weight: task.weight - 25,
                        allPomodoros: allPomodorosNew
                    }
                }
                return task
            }))
        }else if(props.functional === 'delete'){
            props.setDeleting(true);
        }else if(props.functional === 'edit'){
            props.setEditing(true);
        }
    }


    return (
        <li onClick={handleFunctional} className={classes.DropDownItem}>
            {props.children}{props.name}
        </li>
    )
}

DropDownItem.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    weight: PropTypes.number.isRequired,
    functional: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setDeleting: PropTypes.func.isRequired,
    setEditing: PropTypes.func.isRequired
}


export default DropDownItem