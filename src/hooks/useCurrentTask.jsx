import { useContext, useEffect, useState } from "react";
import { TimerContext } from "../context/TimerContext";
import { TaskContext } from "../context/TaskContext";

export function useCurrentTask(){

    const {timerStatus} = useContext(TimerContext);
    const { tasks } = useContext(TaskContext);
    const [uncompleteTasks, setUncompleteTasks] = useState([]);

    useEffect(()=>{
        if(tasks.length > 0){
            if(timerStatus === 'stop'){
                let newUncompleteTasks = [];
                newUncompleteTasks = tasks.filter(task => task.status === 'ready' || task.status === 'started');
                setUncompleteTasks(newUncompleteTasks);
        }else if(timerStatus !== 'stop' ){
            let newUncompleteTasks = [];
            newUncompleteTasks = tasks.filter(task => task.status === 'started');
            setUncompleteTasks(newUncompleteTasks);
        }
        }
    },[tasks, timerStatus])
    
    return [uncompleteTasks[0]]
}