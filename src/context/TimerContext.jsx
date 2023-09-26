import { createContext, useState } from "react";
import React from "react";
import PropTypes from 'prop-types'

export const TimerContext = createContext('stop');

export function TimerProvider({children}){
    const [timerStatus, setTimerStatus] = useState('stop');

    return (
        <TimerContext.Provider value={{timerStatus, setTimerStatus}}>
            {children}
        </TimerContext.Provider>
    )
}

TimerProvider.propTypes = {
    children: PropTypes.node.isRequired
}