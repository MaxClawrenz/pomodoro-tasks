import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "../context/TaskContext"
import classes from '../pomodoro.module.css'
import Task from "./Task";
import moment from "moment";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function TaskList(){
    
    const {tasks} = useContext(TaskContext);
    let uncompleteTasks = tasks.filter(task => task.status === 'ready');
    const [weightSumm, setWeightSumm] = useState(0);
    const [duration, setDuration] = useState({});
    const [hour, setHour] = useState('');
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ['час', 'часа', 'часов']
    
    useEffect(()=>{
        setWeightSumm(uncompleteTasks.reduce((accumulator, currentValue) => accumulator + currentValue.weight, 0));
    }, [tasks])
    

    useEffect(()=>{
        setDuration(moment.duration(weightSumm, 'minutes'));
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
                    if(task.status === 'ready'){
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