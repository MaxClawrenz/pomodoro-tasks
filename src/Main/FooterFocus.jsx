import React, { useContext, useEffect, useState } from "react"
import classes from '../pomodoro.module.css'
import { useWeeksDay } from "../hooks/useWeeksDate";
import { TaskContext } from "../context/TaskContext";
import moment
 from "moment";
function FooterFocus(){

    const curWeek = useWeeksDay()[0];
    const curDay = curWeek.days.find(element => element.today);
    const {tasks} = useContext(TaskContext);
    const [workTime, setWorkTime] = useState(0);
    const [allTime, setAllTime] = useState(0);
    const [focusTime, setFocusTime] = useState(0);

    useEffect(()=>{
        let tempTime = 0;
        tasks.map(element => {
            if(element.id.split('T')[0] === curDay.date && element.status !== 'ready'){
                element.allPomodoros.map(pomodoro => {
                    if(pomodoro.status === 'complete' && pomodoro.type === 'pomodoro'){
                        tempTime += moment(pomodoro.timeFinish).diff(moment(pomodoro.timeStart), 'seconds');
                    }
                })
            }
        })
        setWorkTime(tempTime);
    },[tasks])

    useEffect(()=>{
        let tempTime = 0;
        tasks.map(element => {
            if(element.id.split('T')[0] === curDay.date && element.status !== 'ready'){
                element.allPomodoros.map(pomodoro => {
                    if(pomodoro.status === 'complete'){
                        tempTime += moment(pomodoro.timeFinish).diff(moment(pomodoro.timeStart), 'seconds');
                    }
                })
            }
        })
        setAllTime(tempTime);
    },[tasks])

    useEffect(() => {
        
        if(allTime > 0){
            setFocusTime((workTime/allTime)*100);
        }else{
            setFocusTime(0);
        }

    }, [workTime, allTime])

    return (
        <div className={classes.FooterFocus + ' ' + (allTime > 0 ? classes.FooterFocusActive : '')}>
            <div className={classes.vidjetLeftZone}>
                <div className={classes.FooterFocusName}>
                Фокус
                </div>
                <div className={classes.FooterFocusNumber}>
                    {Math.round(focusTime)}%
                </div>
            </div>
            <div className={classes.vidjetRightZone}>
            <svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 129 129" fill="none">
                <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M64.5 102C85.2107 102 102 85.2107 102 64.5C102 43.7893 85.2107 27 64.5 27C43.7893 27 27 43.7893 27 64.5C27 85.2107 43.7893 102 64.5 102Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M64.5 85C75.8218 85 85 75.8218 85 64.5C85 53.1782 75.8218 44 64.5 44C53.1782 44 44 53.1782 44 64.5C44 75.8218 53.1782 85 64.5 85Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
        </div>
    )
}

export default FooterFocus