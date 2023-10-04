import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "../../../../context/TaskContext"
import classes from '../../../../pomodoro.module.css'
import Task from "./Task";
import moment from "moment";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TimeContext } from "../../../../context/TimeContext";

function TaskList(){
    
    const {tasks, setTasks} = useContext(TaskContext);
    let uncompleteTasks = tasks.filter(task => task.status === 'ready' || task.status === 'started');
    const {mainWorkTime} = useContext(TimeContext);
    const [weightSumm, setWeightSumm] = useState(0);
    const [duration, setDuration] = useState({});
    const [hour, setHour] = useState('');
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ['час', 'часа', 'часов']
    
    useEffect(()=>{
        let allTime = 0;
        uncompleteTasks.map(task => {
            task.allPomodoros.map(pomodor => {
                if(pomodor.type === 'pomodoro'){
                    allTime += mainWorkTime;
                }
            })
        })

        setWeightSumm(allTime);
    }, [tasks, mainWorkTime])

    useEffect(()=>{
        
        setTasks(
            tasks.map(task => {
                if(task.status === 'ready'){
                    return {
                        ...task,
                        weight: mainWorkTime
                    }
                }
                return task
            })
        )
        

    }, [mainWorkTime])
    

    useEffect(()=>{
        setDuration(moment.duration(weightSumm, 'seconds'));
    }, [weightSumm])

    useEffect(()=>{
        if(duration > 0){
            setHour(titles[ (duration.hours()%100>4 && duration.hours()%100<20)? 2 : cases[(duration.hours()%10<5)?duration.hours()%10:5] ]);
        }
    },[duration])

    return (
        
        <ul className={classes.taskUl}>
            <TransitionGroup component={null}>
            {uncompleteTasks.length > 0 && 
            uncompleteTasks.map(task => {
                    if(task.status === 'ready' || task.status === 'started'){
                    return (
                    <CSSTransition
                        key={task.id}
                        timeout={500}
                        classNames="taskItem"
                    >
                        <Task id={task.id}  name={task.name} pomodoro={task.pomodoro} weight={task.weight}/>
                    </CSSTransition>
                    )
                }
                return null;
            }
            )
            }
            </TransitionGroup>
            {weightSumm ?
                (<li className={classes.Task}><div className={classes.tasksTotal}>{duration.hours() ? `${duration.hours()} ${hour}` : ''}  {duration.minutes() ? `${duration.minutes()} мин` : ''} </div></li>)
                : null
            }
        </ul>
    )
}

export default TaskList