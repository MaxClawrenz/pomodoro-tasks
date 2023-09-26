import React, { useContext, useEffect, useState } from "react"
import classes from '../pomodoro.module.css'
import PomodoroFace from "./PomodoroFace"
import PomodoroCounter from './PomodoroCounter'
import { useWeeksDay } from "../hooks/useWeeksDate";
import { TaskContext } from "../context/TaskContext";

function StatisticActivityPomodoros(){

    const curWeek = useWeeksDay()[0];
    const curDay = curWeek.days.find(element => element.today);
    const {tasks} = useContext(TaskContext);
    const cases = [2, 0, 1, 1, 1, 2];
    const pomodoroTitles = ['помидор', 'помидора', 'помидоров'];
    const [allPomodoros, setAllPomodoros] = useState(0);

    useEffect(() => {
        let tempPomodoros = 0;
        tasks.map(element => {
            if(element.id.split('T')[0] === curDay.date && element.status !== 'ready'){
                element.allPomodoros.map(pomodoro => {
                    if(pomodoro.status === 'complete' && pomodoro.type === 'pomodoro'){
                        tempPomodoros ++;
                    }
                })
            }
        })
        setAllPomodoros(tempPomodoros);
    },[])
    
    return (
        <div className={classes.StatisticActivityPomodoros}>
            <div className={classes.pomodorosCounterHeader}>
                {allPomodoros > 0 ? 
                    <PomodoroCounter allPomodoros={allPomodoros}/>
                :
                    <PomodoroFace/> 
                }

            </div>

            {allPomodoros ? 
            <div className={classes.pomodorosCounterFooter}>
                {allPomodoros + ' ' + pomodoroTitles[ (allPomodoros%100>4 && allPomodoros%100<20)? 2 : cases[(allPomodoros%10<5)?allPomodoros%10:5] ]}
            </div>
            : 
            <div className={classes.pomodorosCounterFooterEmpty}></div>
            }
        </div>
    )
}

export default StatisticActivityPomodoros