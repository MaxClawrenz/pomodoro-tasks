import React, { useContext } from "react"
import classes from '../../../../pomodoro.module.css'

import moment from "moment";
import { TimeContext } from "../../../../context/TimeContext";
import { useWeeksDay } from "../../../../hooks/useWeeksDate";

function FooterPauses(){

    const {pauseTime} = useContext(TimeContext);
    const curWeek = useWeeksDay()[0];
    const curDay = curWeek.days.find(element => element.today);
    curDay.counterPause = pauseTime;

    return (
        <div className={classes.FooterPauses + ' ' + (moment.duration(curDay.counterPause, 'seconds').minutes() > 0 ? classes.FooterPausesActive : '')}>
            <div className={classes.vidjetLeftZone}>
                <div className={classes.FooterFocusName}>
                Время на паузе
                </div>
                <div className={classes.FooterFocusNumber}>
                    {moment.duration(curDay.counterPause, 'seconds').minutes()}м
                </div>
            </div>
            <div className={classes.vidjetRightZone}>
            <svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 129 129" fill="none">
                <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M64.3154 37.1579V64.3158L77.8944 77.8947" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
        </div>
    )
}

export default FooterPauses