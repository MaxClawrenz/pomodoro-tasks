import React from "react"
import classes from '../../pomodoro.module.css'
import StatisticIcon from './StatisticIcon'
import StatisticLink from './StatisticLink'


function StatisticDiv(){
    return (
        <div className={classes.StatisticDiv}>
            <StatisticIcon/>
            <StatisticLink/>
        </div>
    )
}

export default StatisticDiv