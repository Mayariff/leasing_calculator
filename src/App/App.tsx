import React from 'react';
import s from './App.module.scss'
import {Title} from '../Conponents';
import {Calculator} from '../features/Сalculator';


function App() {

    return (
        <div className={s.container}>
            <div className={s.contentContainer}>
                <Title text={'Рассчитайте стоимость автомобиля в лизинг'}/>
                <Calculator/>
            </div>
        </div>
    );
}

export default App;
