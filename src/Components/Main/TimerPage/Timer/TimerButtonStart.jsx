import React, { useContext } from "react"
import classes from '../../../../pomodoro.module.css'
import { TimerContext } from "../../../../context/TimerContext"
import { useTimerStart } from "../../../../hooks/TimerHandlers/useTimerStart";

function TimerButtonStart(){

    const {timerStatus} = useContext(TimerContext);
    const handleTimer = useTimerStart();
    
    return (
        <button onClick={handleTimer} className={classes.TimerButtonStart}>
            {
                timerStatus === 'stop' ? 'Старт' : 
                (timerStatus === 'paused' ? 'Продолжить' : 
                (timerStatus === 'break_paused' ? 'Продолжить' : 'Пауза') ) 
            }
        </button>
    )
}


export default TimerButtonStart