import React, { useContext, useEffect, useState } from "react"
import classes from '../../../pomodoro.module.css'
import { useWeeksDay } from "../../../hooks/useWeeksDate";
import { TaskContext } from "../../../context/TaskContext";
import moment from "moment";

function StatisticActivityDays(){
    
    const curWeek = useWeeksDay()[0];
    const curDay = curWeek.days.find(element => element.today);
    const [dayName, setDayName] = useState('');
    const {tasks} = useContext(TaskContext);
    const [dayTime, setDayTime] = useState(0);
    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const cases = [2, 0, 1, 1, 1, 2];
    const hourTitles = ['часа', 'часов', 'часов'];
    const minuteTitles = ['минуты', 'минут', 'минут'];

    useEffect(() => {
        switch (curDay.name) {
            case 'Monday':
                setDayName('Понедельник')
                break;
            case 'Tuesday':
                setDayName('Вторник')
                break;
            case 'Wednesday':
                setDayName('Среда')
                break;
            case 'Thursday':
                setDayName('Четверг')
                break;
            case 'Friday':
                setDayName('Пятница')
                break;
            case 'Saturday':
                setDayName('Суббота')
                break;
            case 'Sanday':
                setDayName('Воскресенье')
                break;
            default:
                break;
        }
    }, [curDay])
    
    useEffect(()=>{
        let tempTime = 0;
        tasks.map(element => {
            if(element.id.split('T')[0] === curDay.date && element.status !== 'ready'){
                element.allPomodoros.map(pomodoro => {
                    if(pomodoro.status === 'complete' && pomodoro.type === 'pomodoro'){
                        tempTime += moment(pomodoro.timeFinish).diff(moment(pomodoro.timeStart), 'seconds');
                    }
                })
            }
        })
        setDayTime(tempTime);
    },[tasks])

    useEffect(() => {
        setHour(moment.duration(dayTime, 'seconds').hours());
        setMinutes(moment.duration(dayTime, 'seconds').minutes());
    }, [dayTime])

    return (
        <div className={classes.StatisticActivityDays}>
            <div className={classes.curDayName}>{dayName}</div>
            <div className={classes.timeInfo}>
            {
                hour > 0 || minutes > 0 ?
                <div>Вы работали над задачами в течение<span className={classes.dayTimeSpan}>
                    {hour > 0 ? ' ' + hour + ' ' + hourTitles[ (hour%100>4 && hour%100<20)? 2 : cases[(hour%10<5)?hour%10:5] ] : ''} 
                    
                    {minutes > 0 ? ' ' + minutes + ' ' + minuteTitles[ (minutes%100>4 && minutes%100<20)? 2 : cases[(minutes%10<5)?minutes%10:5] ] : ''}
                    </span></div>
                :
                'Нет данных'
            }
            </div>
        </div>
    )
}

export default StatisticActivityDays