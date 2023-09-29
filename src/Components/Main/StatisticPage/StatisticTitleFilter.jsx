import React, { useContext, useState } from "react"
import classes from '../../../pomodoro.module.css'
import StatisticFilterElement from "./StatisticFilterElement";
import { WeeksContext } from "../../../context/WeeksContext";


function StatisticTitleFilter(){

    const {selectedWeek, setSelectedWeek} = useContext(WeeksContext);
    const [showFilter, setShowFilter] = useState(false);
    const filterTypes = ['Эта неделя', 'Прошедшая неделя', '2 недели назад']
   
    
    function handleFilterShow(){
        setShowFilter(!showFilter)
    }

    return (
        <div className={classes.StatisticTitleFilter}>
            <div onClick={handleFilterShow} className={classes.StatisticMainFilter}>
                {
                    filterTypes[selectedWeek]
                }
                <div className={showFilter ? classes.reverse : classes.filterIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2"/>
                </svg>
                </div>
            </div>
            <div className={classes.filtersContainer}>
            {showFilter && 
                filterTypes.map((element, index) => {
                    if(index !== selectedWeek){
                        return <StatisticFilterElement handleFilterShow={handleFilterShow} setFilter={setSelectedWeek} key={index} name={element} elemNumber={index}/>
                    }
                })
                
            }
            </div>
        </div>
    )
}

export default StatisticTitleFilter