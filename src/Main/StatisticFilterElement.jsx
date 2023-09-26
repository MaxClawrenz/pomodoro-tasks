import React from "react"
import classes from '../pomodoro.module.css'
import PropTypes from 'prop-types'


function StatisticFilterElement(props){

    

    function handleFilterChange(){
        props.setFilter(props.elemNumber);
        props.handleFilterShow();
    }

    return (
        <div onClick={handleFilterChange} className={classes.StatisticFilterElement}>{props.name}</div>
    )
}

StatisticFilterElement.propTypes = {
    name: PropTypes.string,
    elemNumber: PropTypes.number,
    setFilter: PropTypes.func,
    handleFilterShow: PropTypes.func
}

export default StatisticFilterElement