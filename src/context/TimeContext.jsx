import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import PropTypes from 'prop-types';
import { TimerContext } from "./TimerContext";



export const TimeContext = createContext(5);

export function TimeProvider({children}){
    //настройки таймера

    const initialMainWorkTime = localStorage.getItem('mainWorkTime');
    const initialMainBreakTime = localStorage.getItem('mainBreakTime');
    const initialMainBreakTimeFourth = localStorage.getItem('mainBreakTimeFourth');
    const initialMainBreakTimeFourthPeriod = localStorage.getItem('mainBreakTimeFourthPeriod');
    const initialSwitchSound = localStorage.getItem('switchSound');

    const [mainWorkTime, setMainWorkTime] = useState(initialMainWorkTime ? parseInt(initialMainWorkTime, 10) : 1500);
    const [mainBreakTime, setMainBreakTime] = useState(initialMainBreakTime? parseInt(initialMainBreakTime, 10) : 300);
    const [mainBreakTimeFourth, setMainBreakTimeFourth] = useState(initialMainBreakTimeFourth ? parseInt(initialMainBreakTimeFourth, 10) : 900);
    const [mainBreakTimeFourthPeriod, setMainBreakTimeFourthPeriod] = useState(initialMainBreakTimeFourthPeriod ? parseInt(initialMainBreakTimeFourthPeriod, 10) : 4);
    const [switchSound, setSwitchSound] = useState(initialSwitchSound !== null && initialSwitchSound !== 'false' ? true : false);

    const {timerStatus, setTimerStatus} = useContext(TimerContext);
    const [mainTime, setTime] = useState(mainWorkTime);
    const [pauseTime, setPauseTime] = useState(0);
    const [stops, setStops] = useState(0);

    useEffect(()=>{
        localStorage.setItem('mainWorkTime', mainWorkTime);
    },[mainWorkTime]);

    useEffect(()=>{
      localStorage.setItem('mainBreakTime', mainBreakTime);
    },[mainBreakTime]);

    useEffect(()=>{
      localStorage.setItem('mainBreakTimeFourth', mainBreakTimeFourth);
    },[mainBreakTimeFourth]);

    useEffect(()=>{
      localStorage.setItem('mainBreakTimeFourthPeriod', mainBreakTimeFourthPeriod);
    },[mainBreakTimeFourthPeriod]);

    useEffect(()=>{
      localStorage.setItem('switchSound', switchSound);
    },[switchSound]);

    useEffect(() => {
      setTime(mainWorkTime)
    }, [mainWorkTime])

  
    // Функция для подсчета остановок таймера
    function timerStops(stop){
      setStops(prev => prev + stop);
    }

    // Функция для запуска таймера
  function timerStarting(status){
    setTimerStatus(status);
  }

  // Функция для остановки таймера
  function stopTimer(){
    setTimerStatus('stop');
  }

  // Обновляем состояние времени каждую секунду
  useEffect(() => {
    let intervalId;

    if ((timerStatus === "started" || timerStatus === "break_started") && mainTime > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (mainTime === 0) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerStatus, mainTime]);

  //Таймер для подсчета пауз
  useEffect(() => {
    let pauseInterval;

    if(timerStatus === 'paused'){
      pauseInterval = setInterval(() => {
        setPauseTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(pauseInterval);
    }

    return () => {
      clearInterval(pauseInterval);
    };
  },[timerStatus])


    return (
        <TimeContext.Provider value={{mainBreakTimeFourthPeriod, setMainBreakTimeFourthPeriod, mainBreakTimeFourth, mainBreakTime, mainWorkTime, setMainWorkTime, setMainBreakTime, setMainBreakTimeFourth, mainTime, setTime, timerStarting, stopTimer, timerStops, stops, pauseTime, switchSound, setSwitchSound}}>
            {children}
        </TimeContext.Provider>
    )
}

TimeProvider.propTypes = {
    children: PropTypes.node.isRequired
}