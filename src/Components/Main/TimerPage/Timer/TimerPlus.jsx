import React, { useContext } from "react"
import classes from '../../../../pomodoro.module.css'
import { TaskContext } from "../../../../context/TaskContext";

function TimerPlus(){

    const { tasks, setTasks } = useContext(TaskContext);
    let uncompleteTasks = tasks.filter(task => task.status === 'ready' || task.status === 'started');

    function handleDecrease(){
        setTasks(tasks => tasks.map(task => {
            if(task.id === uncompleteTasks[0].id){
                let pomodoroOnlyTasks = task.allPomodoros.filter(task => task.type === 'pomodoro')
                let pomodoroNumber = pomodoroOnlyTasks.length + 1;
                let allPomodorosNew = task.allPomodoros;
                let newPomodoro = {number: pomodoroNumber, status: 'ready', type: 'pomodoro', timeStart: 0, timeFinish: 0};
                let newBreak = {number: pomodoroNumber, status: 'ready', type: 'break', timeStart: 0, timeFinish: 0}
                allPomodorosNew.push(newPomodoro);
                allPomodorosNew.push(newBreak);
                return {
                    ...task,
                    pomodoro: task.pomodoro + 1,
                    weight: task.weight + 25,
                    allPomodoros: allPomodorosNew
                }
            }
            return task
        }))
    }

    return (
        <div className={classes.TimerPlus} onClick={handleDecrease}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
                <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
            </svg>
        </div>
    )
}

export default TimerPlus