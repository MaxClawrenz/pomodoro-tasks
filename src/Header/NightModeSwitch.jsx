import React, { useContext, useEffect } from "react"
import classes from '../pomodoro.module.css'
import { NightModeContext } from "../context/NightModeContext"


function NightModeSwitch(){

    const {nightMode, setNightMode} = useContext(NightModeContext);
   
    useEffect(()=>{
        document.querySelector('#slider').checked = nightMode;
    },[])

    function handleNight(){
        setNightMode(!nightMode);
    }

    return (
        <div className={classes.NightModeSwitch}>
            <label id="switch" className={classes.switch}>
                <input type="checkbox" onClick={handleNight} id="slider"/>
                <span className={classes.slider + ' ' + classes.round}></span>
            </label>
        </div>
    )
}

export default NightModeSwitch