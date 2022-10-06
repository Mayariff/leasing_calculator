import React, {ChangeEventHandler, FocusEventHandler, FormEventHandler, useEffect, useState} from 'react';
import s from './SmartInput.module.scss';
import {commonActions} from '../../features/common_actions/app-actions';
import {appSelectors} from '../../features/Application';
import {useAppDispatch, useAppSelector} from '../../utils/redux-utils';
import {
    changeMoneyFormat,
    findInitialPayment,
    findPercentPayment,
    findRoundingNumber
} from '../../utils/price-functions';


type currencyType = '₽' | '$' | '€'
type propsType = {
    fieldTitle: string
    indicator: currencyType | '%' | string
    value: number
    min: number
    max: number
    onChangeCB: (value: number) => void
    price?: number
}

const SmartInput = React.memo(({fieldTitle, indicator, value, onChangeCB, min, max, price}: propsType) => {
    const appStatus = useAppSelector(appSelectors.selectStatus)
    const dispatch = useAppDispatch()
    // храним значения для инпута  с индикатором '%'
    const [text, setText] = useState(changeMoneyFormat(findInitialPayment(value, price || 0)))

    //обработчики инпута type='text' с индикатором '%'
    const onInputPercentHandler: FormEventHandler<HTMLInputElement> = (e) => {
        setText(e.currentTarget.value)
        const number = e.currentTarget.value.replace(/\s/g, '').replaceAll(',', '\.')
        if (price) {
            if (Number(number)) {
                const _percent = +findPercentPayment(+number, price).toFixed(1)
                const percent = findRoundingNumber(_percent, min, max)
                onChangeCB(percent)
                dispatch(commonActions.setAppError({error: null}))
            } else if (number.length === 0) {
                dispatch(commonActions.setAppError({error: 'пустое поле'}))
            } else {
                dispatch(commonActions.setAppError({error: 'поле ввода принимает только числовые значения'}))
            }
        } else {
            dispatch(commonActions.setAppError({error: 'Введите стоимость автомобиля'}))
        }
    }
    const onBlurInputPercentHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        if (price) {
            const roundingValue = changeMoneyFormat(findInitialPayment(value, price))
            setText(roundingValue)
            dispatch(commonActions.setAppError({error: null}))
        }
    }

    //обработчики инпута type='text' с другими  индикаторами
    const onInputHandler: FormEventHandler<HTMLInputElement> = (e) => {
        const number = e.currentTarget.value.replace(/\s/g, '').replaceAll(',', '\.')
        if (Number(number)) {
            onChangeCB(+number)
            dispatch(commonActions.setAppError({error: null}))
        } else if (number.length === 0) {
            onChangeCB(+number)
            dispatch(commonActions.setAppError({error: 'пустое поле'}))
        } else {
            dispatch(commonActions.setAppError({error: 'поле ввода принимает только числовые значения'}))
        }
    }
    const onBlurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        const number = e.currentTarget.value.replace(/\s/g, '').replaceAll(',', '\.')
        const roundingNumber = findRoundingNumber(+number, min, max)
        onChangeCB(roundingNumber)
        dispatch(commonActions.setAppError({error: null}))
    }

    //обработчик  инпут type='range' (ползунок)
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        onChangeCB(+e.currentTarget.value)
        if (indicator === '%') {
            setText(changeMoneyFormat(findInitialPayment(+e.currentTarget.value, price || 0)))
        }
    }

    //вычисляем значение % для красивого отображения в индикаторе
    const percentValue = findRoundingNumber(value, min, max) // находим % в заданном интервале значений
    const roundingPercent = percentValue % 100 ? percentValue : percentValue.toFixed(1) // округляем при необходимости

    //определяем, какой индикатор отражать с правой стороны инпута
    const indicatorValue = indicator === '%' ? `${roundingPercent}${indicator}` : indicator

    //выводим сумму в тексовом инпуте ( с разделением на разряды)
    const inputTextValue = indicator === '%' ? text : changeMoneyFormat(value)


    //стили css
    const containerClass = appStatus === 'loading' ? `${s.container} ${s.disabled}` : s.container
    const indicatorStyle = indicator === '₽' || indicator === '$' || indicator === '€' ? `${s.indicator} ${s.currency}` : (indicator === '%' ? `${s.indicator} ${s.percent}` : s.indicator)

    //пересчитываем % в рубли при изменении стоимости авто
    useEffect(()=>{
        if(price===0){
            setText('0')
        }
        setText(changeMoneyFormat(findInitialPayment(value, price || 0)))
    },[price])

    return (
        <div className={containerClass}>
            <label className={s.label}>{fieldTitle.trim()}</label>
            <div className={s.inputContainer}>
                <div className={indicatorStyle}>{indicatorValue}</div>
                <input className={s.textInput}
                       disabled={appStatus === 'loading'}
                       type={'text'}
                       onChange={indicator === '%' ? onInputPercentHandler : onInputHandler}
                       value={inputTextValue}
                       onBlur={indicator === '%' ? onBlurInputPercentHandler : onBlurHandler}
                />
                <div className={s.trackContainer}>
                    <input className={s.range}
                           disabled={appStatus === 'loading'}
                           type={'range'}
                           onChange={onChangeHandler}
                           value={value}
                           min={min}
                           max={max}/>
                </div>
                <div className={s.thumbContainer}>
                    <input className={s.thumb}
                           disabled={appStatus === 'loading'}
                           type={'range'}
                           onChange={onChangeHandler}
                           value={value}
                           min={min}
                           max={max}
                    />
                </div>
            </div>
        </div>
    );
});

export default SmartInput;