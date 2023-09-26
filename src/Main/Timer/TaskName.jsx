import React from "react"
import classes from '../../pomodoro.module.css'
//import { TaskContext } from "../../context/TaskContext"
//import { TimerContext } from "../../context/TimerContext";
import { useCurrentTask } from "../../hooks/useCurrentTask";

function TaskName(){

    //const { tasks } = useContext(TaskContext);
   // const { timerStatus } = useContext(TimerContext);
    const [currentTask] = useCurrentTask();
    
    // let uncompleteTasks = [];
    // if(timerStatus === 'stop'){
    //     uncompleteTasks = tasks.filter(task => task.status === 'ready');
    // }else if(timerStatus === 'started' || timerStatus === 'paused' || timerStatus === 'break_started'){
    //     uncompleteTasks = tasks.filter(task => task.status === 'started');
    // }
    
    

    return (
        <div className={classes.TaskName}>
            <span className={classes.taskLabel}>Задача { currentTask ? currentTask.number : 0}</span> - <span className={classes.taskTitle}>{ currentTask ? currentTask.name : ''}</span>
        </div>
    )
}


export default TaskName