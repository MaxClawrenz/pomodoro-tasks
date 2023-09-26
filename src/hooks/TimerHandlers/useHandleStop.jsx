import { TimerContext } from "../../context/TimerContext";
import { TaskContext } from "../../context/TaskContext";
import { TimeContext } from "../../context/TimeContext";
import { useContext, useEffect, useState } from "react";
import { usePomodorosCheck } from "./usePomodorosCheck";
import { useBreakStart } from "./useBreakStart";
import { useWeeksDay } from "../useWeeksDate";


export function useHandleStop(){
    const curWeek = useWeeksDay()[0];
    const curDay = curWeek.days.find(element => element.today);
    const {timerStatus, setTimerStatus} = useContext(TimerContext);
    const {tasks, setTasks} = useContext(TaskContext);
    const {mainTime, setTime, timerStarting, stopTimer, timerStops, mainBreakTimeFourth, mainWorkTime, mainBreakTime, mainBreakTimeFourthPeriod} = useContext(TimeContext);
    const pomodorosCheck = usePomodorosCheck();
    const breakStart = useBreakStart();
    const [pomodoroCount, setPomodoroCount] = useState(0);
    
    useEffect(()=>{
      let tempTime = 1;
      tasks.map(element => {
          if(element.id.split('T')[0] === curDay.date && element.status !== 'ready'){
              element.allPomodoros.map(pomodoro => {
                  if(pomodoro.status === 'complete' && pomodoro.type === 'pomodoro'){
                      tempTime ++
                  }
              })
          }
      })
      setPomodoroCount(tempTime);
      
  },[tasks])


    let taskNumber 
    
    return function handleStop(){
        if(timerStatus === 'paused'){
          
           const newTaskaArray = tasks.map(task => {
                if (task.status === 'started') {
                  const updatedPomodoros = task.allPomodoros.map(pomodoro => {
                    if (pomodoro.status === 'started') {
                       
                        taskNumber = pomodoro.number;
                      return {
                        ...pomodoro,
                        status: 'complete',
                        timeFinish: new Date().toJSON()
                      };
                    }
                    return pomodoro;
                  });
                  task = pomodorosCheck(updatedPomodoros, task);
                }
                return task;
              });
              setTasks(newTaskaArray);
              if(pomodoroCount%mainBreakTimeFourthPeriod === 0 && pomodoroCount !== 0){
                setTime(mainBreakTimeFourth);
              }else{
                setTime(mainBreakTime);
              }
              timerStarting('break_started');  
              //setTimerStatus('paused');  
              breakStart(taskNumber);
        }else if(timerStatus === 'break_paused' || timerStatus === 'break_started'){
          
          stopTimer();
          setTime(mainWorkTime);
          const newTaskaArray = tasks.map(task => {
              if(task.status === 'started'){
                const updatedPomodoros = task.allPomodoros.map(pomodoro => {
                  if(pomodoro.type === 'break' && pomodoro.status === 'started'){
                    return {
                      ...pomodoro,
                      status: 'complete',
                      timeFinish: new Date().toJSON()
                    }
                  }
                  return pomodoro
                });
                task = pomodorosCheck(updatedPomodoros, task);
              }
              return task;
            })
            setTasks(newTaskaArray);
        }else if(timerStatus === 'started' && mainTime !== 0){
          
          //текущему помидору со статусом started присваиваем статус ready
          stopTimer();
          timerStops(1);
          setTime(mainWorkTime);
          const newTaskaArray = tasks.map(task => {
            if(task.status === 'started'){
              const updatedPomodoros = task.allPomodoros.map(pomodoro => {
                if(pomodoro.type === 'pomodoro' && pomodoro.status === 'started'){
                  return {
                    ...pomodoro,
                    status: 'ready'
                  }
                }
                return pomodoro
              });
              task = pomodorosCheck(updatedPomodoros, task);
            }
            return task;
          })
          setTasks(newTaskaArray);
          setTimerStatus('stop');
        }else if(timerStatus === 'started' && mainTime === 0){
          
          if(pomodoroCount%mainBreakTimeFourthPeriod === 0 && pomodoroCount !== 0){
            setTime(mainBreakTimeFourth);
            timerStarting(mainBreakTimeFourth);
          }else{
            setTime(mainBreakTime);
            timerStarting(mainBreakTime);  
          }
          
           const newTaskaArray = tasks.map(task => {
                if (task.status === 'started') {
                  
                  const updatedPomodoros = task.allPomodoros.map(pomodoro => {
                    
                    if (pomodoro.status === 'started') {
                        
                        taskNumber = pomodoro.number;
                      return {
                        ...pomodoro,
                        status: 'complete'
                      };
                    }
                    return pomodoro;
                  });
                  task = pomodorosCheck(updatedPomodoros, task);
                }
                return task;
              });
              setTasks(newTaskaArray)
              //setTimerStatus('paused');  
              if(pomodoroCount%mainBreakTimeFourthPeriod === 0 && pomodoroCount !== 0){
                setTime(mainBreakTimeFourth);
              }else{
                setTime(mainBreakTime);
              }
              breakStart();
        }
    }
}