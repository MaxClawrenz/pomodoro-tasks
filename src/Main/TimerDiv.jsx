import React, { useContext } from "react"
import classes from '../pomodoro.module.css'
import TimerHeader from "./Timer/TimerHeader"
import Timer from "./Timer/Timer"
import TimerPlus from "./Timer/TimerPlus"
import TaskName from "./Timer/TaskName"
import TimerButtonStart from "./Timer/TimerButtonStart"
import TimerButtonStop from "./Timer/TimerButtonStop"
import { TaskContext } from "../context/TaskContext"
import { TransitionGroup, CSSTransition } from "react-transition-group"

function TimerDiv(){

    const { tasks } = useContext(TaskContext)
    const uncompleteTasks = tasks.filter(task => task.status !== 'complete')
     
    if(uncompleteTasks.length === 0){
        return null
    }
    
    return (
        <TransitionGroup component={null}>    
        {uncompleteTasks.length > 0 &&
            <CSSTransition
                timeout={500}
                classNames="taskTimer"
            >
            <div className={classes.TimerDiv}>
                <TimerHeader/>
                <div className={classes.timerWithButton}>
                    <Timer/>
                    <TimerPlus/>
                </div>
                <TaskName/>
                <div className={classes.timerButtons}>
                    <TimerButtonStart/>
                    <TimerButtonStop/>
                </div>
            </div>
            </CSSTransition>
        }
        </TransitionGroup>
        )
         
        }
        

    


export default TimerDiv