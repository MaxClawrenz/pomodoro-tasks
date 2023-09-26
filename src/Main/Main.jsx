import React from "react"
import classes from '../pomodoro.module.css'
import Rules from "./Rules"
import AddTaskInput from "./AddTaskInput"
import TimerDiv from "./TimerDiv"


function Main(){

    return (
        <div className={classes.Main}>
            <div className={classes.leftZone}>
                <Rules/>
                <AddTaskInput/>
            </div>
            <div className={classes.rightZone}>
                <TimerDiv/>
            </div>
        </div>
    )
}

export default Main