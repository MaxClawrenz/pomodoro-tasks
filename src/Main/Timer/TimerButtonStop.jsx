import React, { useContext } from "react"
import classes from '../../pomodoro.module.css'
import { TimerContext } from "../../context/TimerContext";
import { useHandleStop } from "../../hooks/TimerHandlers/useHandleStop";

function TimerButtonStop(){

    const {timerStatus} = useContext(TimerContext);
    const handleStop = useHandleStop();


    return (
        <button onClick={handleStop} disabled={timerStatus === 'stop'} className={classes.TimerButtonStop}>
          {
            timerStatus === 'paused' ? 'Сделано' : 
            (timerStatus === 'break_started' || timerStatus === 'break_paused' ? 'Пропустить' : 
            'Стоп')
          }
            </button>
    )
}

export default TimerButtonStop