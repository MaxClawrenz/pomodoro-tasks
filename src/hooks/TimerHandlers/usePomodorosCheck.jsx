import { useContext } from "react";
import { TimerContext } from "../../context/TimerContext";

export function usePomodorosCheck(){

    const {setTimerStatus} = useContext(TimerContext);


    return function pomodorosCheck(updatedPomodoros, task){
        const allPomodorosIsComplete = updatedPomodoros.every(pomodoro => pomodoro.status === 'complete');
          if(allPomodorosIsComplete){
            setTimerStatus('stop');
              return {
                ...task,
                status: 'complete',
                finishDate: new Date().toJSON(),
                allPomodoros: updatedPomodoros
              }
          }else{
            //setTimerStatus('break_started');
              return {
                ...task,
                //status: 'ready',
                allPomodoros: updatedPomodoros
              };
          }
      }
}