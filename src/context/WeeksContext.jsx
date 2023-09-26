import { createContext, useState } from "react";
import React from "react";
import PropTypes from 'prop-types'

export const WeeksContext = createContext(0);

export function WeeksProvider({children}){
    const [selectedWeek, setSelectedWeek] = useState(0);


    return (
        <WeeksContext.Provider value={{setSelectedWeek, selectedWeek}}>
            {children}
        </WeeksContext.Provider>
    )
}

WeeksProvider.propTypes = {
    children: PropTypes.node
}