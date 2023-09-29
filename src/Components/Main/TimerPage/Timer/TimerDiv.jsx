import React, { useContext } from "react"
import classes from '../../../../pomodoro.module.css'
import TimerHeader from "./TimerHeader"
import Timer from "./Timer"
import TimerPlus from "./TimerPlus"
import TaskName from "./TaskName"
import TimerButtonStart from "./TimerButtonStart"
import TimerButtonStop from "./TimerButtonStop"
import { TaskContext } from "../../../../context/TaskContext"
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