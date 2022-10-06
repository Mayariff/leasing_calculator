import React from 'react';
import s from './AccentBlock.module.scss'
import {changeMoneyFormat} from '../../utils/price-functions';

type propsType = {
    title: string
    totalSum: number
    currency?: '₽' | '$' | '€' | '%'
}

const AccentBlock = ({title, totalSum, currency}: propsType) => {

    let sum = changeMoneyFormat(Math.round(totalSum))


    return (
        <div className={s.container}>
            <div className={s.title}>{title}</div>
            <div className={s.totalSum}>{sum} {currency && <span className={s.currency}>{currency}</span>}</div>
        </div>
    );
};

export default AccentBlock;