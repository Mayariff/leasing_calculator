import React, {useEffect, useState} from 'react';
import s from './App.module.scss'
import Title from "../Conponents/Title/Title";
import Calculator from "../features/Сalculator/Calculator";


function App() {


    return (
        <div className={s.container}>
            <div className={s.contentContainer}>
                <Title text={'Рассчитайте стоимость автомобиля в лизинг'}/>
            <Calculator  />
            </div>
        </div>
    );
}

export default App;
