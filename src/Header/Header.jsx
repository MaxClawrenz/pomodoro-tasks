import classes from '../pomodoro.module.css'
import React from 'react'
import PomodoroLogo from './PomodoroLogo'
import StatisticDiv from './StatisticDiv'
import NightModeSwitch from './NightModeSwitch'
import SettingsBlock from './SettingsBlock'

function Header(){
    return (
        <div className={classes.header}>
            <PomodoroLogo />
            <div className={classes.SettingsDiv}>
            <NightModeSwitch/>
            <SettingsBlock/>
            </div>
            <StatisticDiv/>
        </div>
    )
}

export default Header