import React from "react"
import classes from '../../../pomodoro.module.css'
import StatisticTitle from "./StatisticTitle"
import StatisticGraphics from "./StatisticGraphics"
import StatisticFooter from "./StatisticFooter"


function MainStatistic(){
    return (
        <div className={classes.MainStatistic}>
            
                <StatisticTitle/>
                <StatisticGraphics/>
                <StatisticFooter/>
           
        </div>
    )
}

export default MainStatistic