import React, { useContext } from "react"
import classes from '../pomodoro.module.css'
import PropTypes from 'prop-types'
import { TimeContext } from "../context/TimeContext";
import moment from "moment";


function ModalSettings(props){

    const {mainBreakTimeFourth, mainWorkTime, mainBreakTime, switchSound, setSwitchSound, setMainWorkTime, setMainBreakTime, setMainBreakTimeFourth, mainBreakTimeFourthPeriod, setMainBreakTimeFourthPeriod} = useContext(TimeContext);

    return (
        
        <div className={classes.ModalDelete}>
            <div className={classes.ModalSettings}>
                <div className={classes.ModalSettingsHeader}>
                <div className={classes.ModalSettingsTitle}>Настройки</div>
                <div onClick={()=>{props.setShowSettings(false);}} className={classes.ModalDeleteClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4"/>
                    </svg>
                </div>
                </div>
            
                <div className={classes.settingsElem}>
                    <span className={classes.settingsLabel}>Длительность помидора</span>
                    <div className={classes.settingsElemRight}>
                        <input onChange={(event)=>
                        {if(Number(event.target.value) <= 300){
                            setMainWorkTime(300)
                        }else if(Number(event.target.value) >= 3300){
                            setMainWorkTime(3300)
                        }else{
                            
                            setMainWorkTime(Number(event.target.value))
                        }}
                            } className={classes.settingInput} type="number" value={mainWorkTime} step={300} min="300" max="3300"/>
                        <span className={classes.spanEditLabel}>{moment.duration(mainWorkTime, 'seconds').minutes()} мин.</span>
                    </div>
                </div>
                <div className={classes.settingsElem}>
                    <span className={classes.settingsLabel}>Длительность перерыва</span>
                    <div className={classes.settingsElemRight}>
                        <input onChange={(event)=>
                            {if(Number(event.target.value) <= 300){
                                setMainBreakTime(300)
                            }else if(Number(event.target.value) >= 900){
                                setMainBreakTime(900)
                            }else{
                                
                                setMainBreakTime(Number(event.target.value))
                            }
                            }
                            } className={classes.settingInput} type="number" value={mainBreakTime} step={300} min="300" max="900"/>
                        <span className={classes.spanEditLabel}>{moment.duration(mainBreakTime, 'seconds').minutes()} мин.</span>
                    </div>
                </div>
                <div className={classes.settingsElem}>
                    <span className={classes.settingsLabel}>Длительность длинного перерыва</span>
                    <div className={classes.settingsElemRight}>
                        <input onChange={(event)=>
                        {if(Number(event.target.value) <= 300){
                            setMainBreakTimeFourth(300)
                        }else if(Number(event.target.value) >= 1800){
                            setMainBreakTimeFourth(1800)
                        }else{
                            setMainBreakTimeFourth(Number(event.target.value))
                        }}
                            
                            } className={classes.settingInput} type="number" value={mainBreakTimeFourth} step={300} min="300" max="1800"/>
                        <span className={classes.spanEditLabel}>{moment.duration(mainBreakTimeFourth, 'seconds').minutes()} мин.</span>
                    </div>
                </div>
                <div className={classes.settingsElem}>
                    <span className={classes.settingsLabel}>Частота длинных перерывов</span>
                    <div className={classes.settingsElemRight}>
                        <input onChange={(event)=>{
                            if(Number(event.target.value) <=1){
                                setMainBreakTimeFourthPeriod(1)
                            }else if(Number(event.target.value) >=5){
                                setMainBreakTimeFourthPeriod(5)
                            }else{
                                setMainBreakTimeFourthPeriod(Number(event.target.value))
                            }
                        }} className={classes.settingInput} type="number" value={mainBreakTimeFourthPeriod} step={1} min="1" max="5"/>
                    </div>
                </div>
                <div className={classes.settingsElem}>
                    <span className={classes.settingsLabel}>Звуковые уведомления</span>
                    <div className={classes.settingsElemRight}>
                        
                        <label id="switch" className={classes.switch}>
                            <input checked={switchSound} type="checkbox" onClick={() => setSwitchSound(!switchSound)} id="slider"/>
                            <span className={classes.slider2 + ' ' + classes.round}></span>
                        </label>
                    </div>
                </div>
                <div className={classes.settingsElem}></div>
            </div>
        </div>
        
    )
}

ModalSettings.propTypes = {
    setShowSettings: PropTypes.func
}

export default ModalSettings