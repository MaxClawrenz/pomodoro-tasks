import React, { useContext, useState } from "react"
import classes from '../../../../pomodoro.module.css' 
import { TaskContext } from "../../../../context/TaskContext";
import TaskList from "./TaskList";
import { TimeContext } from "../../../../context/TimeContext";


function AddTaskInput(){

    const [nameTask, setNameTask] = useState('');
    const { tasks, addTask} = useContext(TaskContext);
    const {mainWorkTime} = useContext(TimeContext);

    function handleChange(event){
        setNameTask(event.target.value);
    }

    function newId(){
        return new Date().toJSON();
    }

    function handleSubmit(){
        if(nameTask){
            const newTaskObj = {id: newId(), number: tasks.length+1, name: nameTask, pomodoro: 1, status: 'ready', weight: mainWorkTime, finishDate: '', 
            allPomodoros: [{number: 1, status: 'ready', type: 'pomodoro', timeStart: 0, timeFinish: 0}, {number: 1, status: 'ready', type: 'break', timeStart: 0, timeFinish: 0}]};
            addTask(newTaskObj);
            setNameTask('');
        }
    }


    return (
        <div className={classes.tasksForm}>
            <input autoComplete="off" onChange={handleChange} value={nameTask} placeholder="Название задачи" className={classes.AddTaskInput} type="text" id="AddTaskInput" />
            <button onClick={handleSubmit} className={classes.ButtonCreateTask}>Добавить</button>
            <div className={classes.taskList}>
                <TaskList/>
            </div>
        </div>
    )
}

export default AddTaskInput