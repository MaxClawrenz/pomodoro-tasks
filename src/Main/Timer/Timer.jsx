import React, { useContext, useEffect, useState } from "react"
import classes from '../../pomodoro.module.css'
import { TimerContext } from "../../context/TimerContext"
import { TimeContext } from "../../context/TimeContext";
import moment from "moment";
import { useHandleStop } from "../../hooks/TimerHandlers/useHandleStop";
import addNotification from "react-push-notification";
import notificationSound from '../../Audio/newMessage.wav'

function Timer(){

    const {timerStatus, setTimerStatus} = useContext(TimerContext);
    const {mainTime, stopTimer, mainWorkTime, switchSound} = useContext(TimeContext);
    const [duration, setDuration] = useState(moment.duration(mainWorkTime, 'seconds'))
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const handleStop = useHandleStop();
    const [timerActive, setTimerActive] = useState('');

    const notificationSoundFile = new Audio(notificationSound);

    useEffect(()=>{
        setMinutes(duration.minutes());
        setSeconds(duration.seconds());
    },[duration])
    
    useEffect(()=>{
        if(mainTime === 0 && timerStatus === 'started'){
            setTimerStatus('paused');
            addNotification({
                title: 'Warning',
                subtitle: 'This is a subtitle',
                message: 'This is a very long message',
                theme: 'red',
                native: false, // when using native, your OS will handle theming.
                position: 'top-right',
                silent: false,
                closeButton: 'Закрыть'
            });
            if(switchSound){
                notificationSoundFile.play();
            }
        }else if(mainTime === 0 && timerStatus === 'break_started'){
            stopTimer();
            handleStop();
            addNotification({
                title: 'Warning',
                subtitle: 'This is a subtitle',
                message: 'This is a very long message',
                theme: 'light',
                native: false, // when using native, your OS will handle theming.
                position: 'top-right',
                silent: false,
                closeButton: 'Закрыть'
            });
            if(switchSound){
                notificationSoundFile.play();
            }
        }
        setDuration(moment.duration(mainTime, 'seconds'));
    },[mainTime])

    useEffect(()=>{
        if(mainTime === 0 && timerStatus === 'paused'){
            handleStop();
        }else if(mainTime === 0 && timerStatus === 'stop'){
            handleStop();
        }
    },[timerStatus])

    useEffect(()=>{
        if(timerStatus === 'started' || timerStatus === 'break_started'){
            setTimerActive('TimerColonActive');
        }else{
            setTimerActive('');
        }
    },[timerStatus])
    
    return (
        <div className={classes.Timer + ' ' + (timerStatus === 'started' ? classes.TimerActive : (timerStatus === 'break_started' ? classes.TimerCounterRelax : ''))}>
            {minutes < 10 ? '0' + minutes : minutes}
            <span className={timerActive ? classes.TimerColonActive : ''}>:</span>
            {seconds === 0 ? '00' : (seconds < 10 ? '0'+seconds : seconds)}
            </div>
    )
}

export default Timer