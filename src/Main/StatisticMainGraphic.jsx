import React, { useContext, useEffect, useState } from "react"
import classes from '../pomodoro.module.css'
import moment from "moment";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TaskContext } from "../context/TaskContext";
import { WeeksContext } from "../context/WeeksContext";
import { useWeeksDay } from "../hooks/useWeeksDate";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function StatisticMainGraphic(){
  const {tasks} = useContext(TaskContext);
  const {selectedWeek} = useContext(WeeksContext)
  const curWeek = useWeeksDay()[selectedWeek];
  const [ daysTime, setDaysTime] = useState([]);
  const daysLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Cб', 'Вс'];
  const [colorsArray, setColorsArray] = useState([]);
  const [colorsFontArray, setColorsFontArray] = useState([]);
  const newColorsArray = [];
  const newColorsFontArray = [];

  useEffect(()=>{
    let tempArray = [];
    curWeek.days.map(day => {
      let tempTime = 0;
      tasks.map(element => {
        if(element.id.split('T')[0] === day.date && element.status !== 'ready'){
            element.allPomodoros.map(pomodoro => {
                if(pomodoro.status === 'complete' && pomodoro.type === 'pomodoro'){
                    tempTime += moment(pomodoro.timeFinish).diff(moment(pomodoro.timeStart), 'seconds');
                }
            })
        }
    })
    tempArray.push(Math.round(tempTime/60));
    if(!day.today){
      newColorsFontArray.push('rgba(153, 153, 153, 1)')
      if(tempTime){
        newColorsArray.push('rgba(234, 138, 121, 1)');
      }else{
        newColorsArray.push('rgba(196, 196, 196, 1)');
      }
    }else{
      newColorsFontArray.push('rgba(220, 62, 34, 1)');
      if(tempTime){
        newColorsArray.push('rgba(234, 138, 121, 1)');
      }else{
        newColorsArray.push('rgba(196, 196, 196, 1)');
      }
    }
  })
  setColorsArray(newColorsArray);
  setColorsFontArray(newColorsFontArray);
  setDaysTime(tempArray);

},[selectedWeek, tasks])


    const dataSet = daysTime;

    const options = {
      
        scales: {
            y: {
              beginAtZero: false,
              labels: ['25 мин', '50 мин', '1 ч 15 мин', '1 ч 40 мин'],
              position: 'right',
              suggestedMin: 25,
              suggestedMax: 100, 
              ticks: {
                stepSize: 25, 
                callback: function (value) {
                  const hours = Math.floor(value / 60);
                  const minutes = value % 60;
                  if(hours && minutes){
                    return `${hours} ч ${minutes} мин`;
                  }else if(!hours && minutes){
                    return `${minutes} мин`;
                  }else{
                    return ``
                  }
                },
              },
              
            },
            x: {
                grid: {
                    display: false, 
                  },
            }
          },
          
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          indexAxis: 'x',
          minBarLength: 9,
      };

      const data = {
        labels: daysLabels,
        datasets: [
          {
            label: '',
            backgroundColor: colorsArray,
            borderColor: colorsArray,
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(238, 115, 93, 1)',
            hoverBorderColor: 'rgba(238, 115, 93, 1)',
            data: dataSet,
            barThickness: 77
          },
        ],
      };
    return (
        <div className={classes.StatisticMainGraphic}>
            <Bar options={options} data={data}/>
            <div className={classes.graphicFooterBack}>
              <div className={classes.graphicFooter}>
              {daysLabels.length &&
              daysLabels.map((day, index) => (
                <div key={day} style={{color:colorsFontArray[index]}}>{day}</div> 
              ))
              }
            </div>
            </div>
        </div>
    )
}

export default StatisticMainGraphic