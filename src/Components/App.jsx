import './App.css';
import React from 'react';
import PomodoroPage from './Main/TimerPage/PomodoroPage';
import StatisticPage from './Main/StatisticPage/StatisticPage';
import { TaskProvider } from '../context/TaskContext';
import { TimerProvider } from '../context/TimerContext';
import { TimeProvider } from '../context/TimeContext';
import { Route, Routes } from 'react-router-dom';
import { WeeksProvider } from '../context/WeeksContext';
import { Notifications } from 'react-push-notification';

function App() {

  return (
    <WeeksProvider>
        <TimerProvider>
          <TimeProvider>
            <TaskProvider>
              <Notifications/>
            <Routes>
                <Route path='/' element={<PomodoroPage />}  />
                <Route element={<PomodoroPage />} path='/pomodoro_tasks' />
                <Route element={<PomodoroPage />} path='*'/>
                <Route element={<StatisticPage />} path='/statistic' />
              </Routes>  
            </TaskProvider>
          </TimeProvider>
        </TimerProvider>
      </WeeksProvider>
  );
}



export default App;
