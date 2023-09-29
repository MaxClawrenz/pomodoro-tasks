import React from "react"
import classes from '../../pomodoro.module.css'
import { Link } from "react-router-dom"

function StatisticLink(){
    return (
        <Link className={classes.StatisticLink} to="/statistic">Статистика</Link>
    )
}

export default StatisticLink