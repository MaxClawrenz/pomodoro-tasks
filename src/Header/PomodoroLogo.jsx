import classes from '../pomodoro.module.css'
import React from 'react'
import PomodoroLogoIcon from './PomodoroLogoIcon'
import PomodoroLink from './PomodoroLink'

function PomodoroLogo(){
    return (
        <div className={classes.PomodoroLogo}>
            <PomodoroLogoIcon/>
            <PomodoroLink/>
        </div>
    )
}

export default PomodoroLogo