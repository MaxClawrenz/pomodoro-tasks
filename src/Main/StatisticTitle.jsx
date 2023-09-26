import React from "react"
import classes from '../pomodoro.module.css'
import StatisticTitleFilter from "./StatisticTitleFilter"

function StatisticTitle(){
    return (
        <div className={classes.StatisticTitle}>
            <div className={classes.StatisticTitleText}>Ваша активность</div>
            <StatisticTitleFilter />
        </div>
    )
}

export default StatisticTitle