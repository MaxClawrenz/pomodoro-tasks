import { TimerContext } from "../../context/TimerContext";
import { TaskContext } from "../../context/TaskContext";
import { useCurrentTask } from "../useCurrentTask";
import { TimeContext } from "../../context/TimeContext";
import { useContext } from "react";


export function useTimerStart(){

    const {timerStatus, setTimerStatus} = useContext(TimerContext);
    const { setTasks } = useContext(TaskContext);
    const [currentTask] = useCurrentTask();
    const {timerStarting, stopTimer} = useContext(TimeContext);

    return function handleTimer(){
        if(timerStatus === 'stop'){
            setTimerStatus('started');
            timerStarting('started');
            setTasks(
                tasks => {
                const updatedTasks = [...tasks];
                if(updatedTasks.length > 0){
                    for(let task of updatedTasks){
                        if(task.status === 'ready' && task.id === currentTask.id){
                            task.status = 'started';
                            const updatedPomodoros = [...task.allPomodoros];
                            const index = updatedPomodoros.findIndex(pomodoro => pomodoro.status === 'ready')
                        if(index !== -1){
                            updatedPomodoros[index].status = 'started';
                            updatedPomodoros[index].timeStart = new Date().toJSON();
                        }  
                        break
                        }else if(task.status === 'started' && task.id === currentTask.id){
                            const updatedPomodoros = [...task.allPomodoros];
                            const index = updatedPomodoros.findIndex(pomodoro => pomodoro.status === 'ready')
                        if(index !== -1){
                            updatedPomodoros[index].status = 'started';
                            updatedPomodoros[index].timeStart = new Date().toJSON();
                        }  
                        break

                        }
                    }  
                    
                }
                return updatedTasks
            })
        }else if(timerStatus === 'paused'){
            setTimerStatus('started');
            timerStarting('started');
        }else if(timerStatus === 'started'){
            setTimerStatus('paused');
            clearInterval(stopTimer.current);
        }else if(timerStatus === 'break_started'){
            setTimerStatus('break_paused');
            clearInterval(stopTimer.current);
        }else if(timerStatus === 'break_paused'){
            setTimerStatus('break_started');
            timerStarting('break_started');
        }
    }
}