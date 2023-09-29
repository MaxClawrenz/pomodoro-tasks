import React from "react"
import classes from '../../../pomodoro.module.css'

function Rules(){
    return(
        <div>
            <span className={classes.RulesTitle}>Ура! Теперь можно начать работать:</span>
            <ul className={classes.RulesList}>
                <li>Выберите категорию и напишите название текущей задачи</li>
                <li>Запустите таймер («помидор»)</li>
                <li>Работайте пока «помидор» не прозвонит</li>
                <li>Сделайте короткий перерыв (3-5 минут)</li>
                <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
            </ul>
        </div>
    )
}

export default Rules