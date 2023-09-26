import React from "react"
import classes from '../pomodoro.module.css'
import { Link } from "react-router-dom"

function PomodoroLink(){
    return (
        <Link className={classes.PomodoroLink} to="/pomodoro_tasks">pomodoro_box</Link>
    )
}

export default PomodoroLink