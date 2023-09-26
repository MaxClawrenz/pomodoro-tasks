import { TaskContext } from "../../context/TaskContext";
import { useCurrentTask } from "../../hooks/useCurrentTask";
import { useContext } from "react";



export function useBreakStart(){

    const {setTasks} = useContext(TaskContext);
    const [currentTask] = useCurrentTask();
    
    
    return function breakStart(taskNumberLet){


        setTasks(tasks => tasks.map(task => {
          if(task.id === currentTask.id){
           
            task.allPomodoros = task.allPomodoros.map(pomodoro => {
              if(pomodoro.type === 'break' && pomodoro.number === taskNumberLet){
                return {
                  ...pomodoro,
                  status: 'started',
                  timeStart: new Date().toJSON()
                }
              }
              return pomodoro
            })
          }
          return task
        }))
      
    }
}