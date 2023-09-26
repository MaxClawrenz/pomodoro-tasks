import React, { useContext } from "react"
import classes from '../pomodoro.module.css'
import PropTypes from 'prop-types'
import { TaskContext } from "../context/TaskContext"

function ModalDelete(props){

    const { setTasks } = useContext(TaskContext);

    function TaskDelete(){
        setTasks(prevState => prevState.filter(task => task.id !== props.id));
    }

    return (
        <div className={classes.ModalDelete}>
            <div className={classes.ModalDeleteDiv}>
                <div onClick={()=>{props.setDeleting(false);}} className={classes.ModalDeleteClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4"/>
                    </svg>
                </div>
                <div className={classes.ModalDeleteHeader}>
                    <span className={classes.ModalDeleteLabel}>Удалить задачу?</span>
                </div>
                <div className={classes.deletingControls}>
                    <button className={classes.deleteButton} onClick={TaskDelete}>Удалить</button>
                    <div onClick={()=>{props.setDeleting(false);}} className={classes.deleteCancel}>Отмена</div>
                </div>
            </div>
        </div>
    )
}

ModalDelete.propTypes = {
    setDeleting: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}

export default ModalDelete