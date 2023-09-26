import React from "react"
import classes from '../pomodoro.module.css'
import FooterFocus from "./FooterFocus"
import FooterPauses from "./FooterPauses"
import FooterStops from "./FooterStops"

function StatisticFooter(){
    return (
        <div className={classes.StatisticFooter}>
            <FooterFocus />
            <FooterPauses />
            <FooterStops />
        </div>
    )
}

export default StatisticFooter