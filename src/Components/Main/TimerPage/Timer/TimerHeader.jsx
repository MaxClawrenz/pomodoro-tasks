import React, { useContext, useEffect, useState } from "react"
import classes from '../../../../pomodoro.module.css'
import { TimerContext } from "../../../../context/TimerContext";
import { useCurrentTask } from "../../../../hooks/useCurrentTask";
import { TaskContext } from "../../../../context/TaskContext";

function TimerHeader(){

    const { timerStatus } = useContext(TimerContext);
    const {tasks} = useContext(TaskContext);
    const [currentTask] = useCurrentTask();
    const [pomodorosArr, setPomodorosArr] = useState(tasks[0].allPomodoros);

    useEffect(()=>{
        if(currentTask){
            setPomodorosArr(currentTask.allPomodoros.filter(pomodor => pomodor.status === 'ready' || pomodor.status === 'started'));
        }
    },[currentTask])
    
    

    return (
        <div className={classes.TimerHeader + ' ' + (timerStatus==='started' || timerStatus==='paused' ? classes.TimerHeaderActive : (timerStatus==='break_started' || timerStatus === 'break_paused' ? classes.TimerRelax : ''))}>
            <div className={classes.timerHeaderTaskname}>{ currentTask ? currentTask.name : ''}</div>
            <div className={classes.timerHeaderPomodoroCounter}>{pomodorosArr.length > 0 && pomodorosArr[0].type === 'pomodoro' ? 'Помидор' : 'Перерыв'} { pomodorosArr.length > 0 ? pomodorosArr[0].number : 'empty'}</div>
        </div>
    )
}

export default TimerHeader