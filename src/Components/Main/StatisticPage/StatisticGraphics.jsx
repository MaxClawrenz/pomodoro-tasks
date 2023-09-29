import React from "react"
import classes from '../../../pomodoro.module.css'
import StatisticActivityDays from "./StatisticActivityDays"
import StatisticActivityPomodoros from "./StatisticActivityPomodoros"
import StatisticMainGraphic from "./StatisticMainGraphic"

function StatisticGraphics(){
    return (
        <div className={classes.StatisticGraphics}>
            <div className={classes.leftGraphics}>
                <StatisticActivityDays/>
                <StatisticActivityPomodoros/>
            </div>
            <div className={classes.mainGraphic}>
                <StatisticMainGraphic/>
            </div> 
        </div>
    )
}

export default StatisticGraphics