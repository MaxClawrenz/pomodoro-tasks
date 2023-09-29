import React from "react"
import classes from '../../../pomodoro.module.css'
import FooterFocus from "./Footer/FooterFocus"
import FooterPauses from "./Footer/FooterPauses"
import FooterStops from "./Footer/FooterStops"

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