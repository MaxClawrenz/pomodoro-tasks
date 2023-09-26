import { createContext, useEffect, useState } from "react";
import React from "react";
import PropTypes from 'prop-types'

export const TaskContext = createContext([]);

export function TaskProvider({ children }){

    const initialTasksArray = JSON.parse(localStorage.getItem('tasks'));
    const [tasks, setTasks] = useState(initialTasksArray ? initialTasksArray : []);
    
    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },[tasks])


    function addTask(task){
        setTasks([...tasks, task])
    }

    return (
        <TaskContext.Provider value={{tasks, addTask, setTasks}}>
            {children}
        </TaskContext.Provider>
        )

}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };