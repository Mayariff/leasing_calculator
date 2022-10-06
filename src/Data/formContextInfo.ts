import React from 'react';

export type conditionsType = typeof data

export const data = {
    conditions: {
        //“Стоимость автомобиля” p
        car_coast: {
            min: 1000000,
            max: 6000000,
        },
        //“Первоначальный взнос”  10% - 60%
        initail_payment_percent: {
            min: 10,
            max: 60
        },
        //“Срок лизинга”
        lease_term: {
            min: 1,
            max: 60
        },
        //Процентная ставка
        interest_rate: 3.5,
        start_values: {
            car_coast: 3300000,
            initail_payment_percent: 10,
            lease_term: 60
        }

    }
}

export const DataContex = React.createContext(data.conditions)


