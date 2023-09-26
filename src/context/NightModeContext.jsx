import { createContext, useEffect, useState } from "react";
import React from "react";
import PropTypes from 'prop-types';

export const NightModeContext = createContext(false);

export function NightModeProvider({children}){

    const initialNightMode = localStorage.getItem('nightMode');
    const [nightMode, setNightMode] = useState(initialNightMode !== null & initialNightMode !== 'false' ? true : false);

    useEffect(()=>{
        if(nightMode){
            document.querySelector('body').classList.add('night');
            localStorage.setItem('nightMode', true);
        }else{
            document.querySelector('body').classList.remove('night');
            localStorage.setItem('nightMode', false);
        }
    },[nightMode])

    return (
        <NightModeContext.Provider value={{nightMode, setNightMode}}>
            {children}
        </NightModeContext.Provider>
    )
}

NightModeProvider.propTypes = {
    children: PropTypes.node
}