import React, {MouseEventHandler, useCallback, useContext, useEffect, useState} from 'react';
import s from './Calculator.module.scss'
import {DataContex} from '../../Data/formContextInfo';
import {paramsType} from '../../API/type';
import {findInitialPayment, findLeasingSum, findMonthPay} from '../../utils/price-functions';
import {calculatorActions} from './index';
import {useAppDispatch} from '../../utils/redux-utils';
import {AccentBlock, Button, SmartInput} from '../../Conponents';



const Calculator = () => {
    const conditions = useContext(DataContex)
    const dispatch = useAppDispatch()


    //следим за шириной экрана для верстки
    const [screenWidth, setScreenWidth] = useState<number>(window.screen.width)
    useEffect(() => {
        function findWidth() {
            setScreenWidth(window.screen.width)
        }

        window.addEventListener('resize', findWidth);
        return () => window.removeEventListener('resize', findWidth)
    }, [window.screen.width])


    //значения ползунков
    const [carCoast, setCarCoast] = useState<number>(conditions.start_values.car_coast)
    const [initPaymentPercent, setInitPaymentPercent] = useState<number>(conditions.start_values.initail_payment_percent)
    const [leaseTerm, setLeaseTerm] = useState<number>(conditions.start_values.lease_term)

    // обработчики значений ползунков
    const onChangeCoast = useCallback((value: number) => setCarCoast(value), [setCarCoast])
    const onChangeInitPaymentPercent = useCallback((value: number) => setInitPaymentPercent(value), [setInitPaymentPercent])
    const onChangeLeaseTerm = useCallback((value: number) => setLeaseTerm(value), [setLeaseTerm])

    //рассчетные показатели
    const InitialPayment = findInitialPayment(initPaymentPercent, carCoast)
    const monthlyPayment = findMonthPay(carCoast, InitialPayment, leaseTerm)
    const totalSum = findLeasingSum(InitialPayment, leaseTerm, monthlyPayment)


    //кнопка
    const onclickHandler: MouseEventHandler<HTMLInputElement> = useCallback(async (e) => {
        e.preventDefault()
        const params: paramsType = {
            car_coast: carCoast,
            initail_payment: InitialPayment,
            initail_payment_percent: initPaymentPercent,
            lease_term: leaseTerm,
            total_sum: totalSum,
            monthly_payment_from: monthlyPayment,
        }
        await dispatch(calculatorActions.sendApplication(params))
        alert('Ваша заявка отправлена')
    },[])

    return (
        <form className={s.form}>
            {screenWidth > 1024 ? <>
                <div className={s.fieldset}>
                    <SmartInput value={carCoast}
                                fieldTitle={'Стоимость автомобиля'}
                                indicator={'₽'}
                                min={conditions.car_coast.min}
                                max={conditions.car_coast.max}
                                onChangeCB={onChangeCoast}
                    />
                    <AccentBlock title={'Сумма договора лизинга'} totalSum={totalSum} currency={'₽'}/>
                </div>
                <div className={s.fieldset}>
                    <SmartInput value={initPaymentPercent}
                                fieldTitle={'Первоначальный взнос'}
                                indicator={'%'}
                                min={conditions.initail_payment_percent.min}
                                max={conditions.initail_payment_percent.max}
                                onChangeCB={onChangeInitPaymentPercent}
                                price={carCoast}
                    />
                    <AccentBlock title={'Eжемесячный платеж от'} totalSum={monthlyPayment} currency={'₽'}/>
                </div>
                <div className={s.fieldset}>
                    <SmartInput value={leaseTerm}
                                fieldTitle={'Срок лизинга'}
                                min={conditions.lease_term.min}
                                max={conditions.lease_term.max}
                                onChangeCB={onChangeLeaseTerm}
                                indicator={'мес.'}/>
                    <Button value={'Оставить заявку'} onClick={onclickHandler}/>
                </div>
            </> : <>
                <div className={s.fieldset}>
                    <SmartInput value={carCoast}
                                fieldTitle={'Стоимость автомобиля'}
                                indicator={'₽'}
                                min={conditions.car_coast.min}
                                max={conditions.car_coast.max}
                                onChangeCB={onChangeCoast}
                    />
                    <SmartInput value={initPaymentPercent}
                                fieldTitle={'Первоначальный взнос'}
                                indicator={'%'}
                                min={conditions.initail_payment_percent.min}
                                max={conditions.initail_payment_percent.max}
                                onChangeCB={onChangeInitPaymentPercent}
                                price={carCoast}
                    />
                    <SmartInput value={leaseTerm}
                                fieldTitle={'Срок лизинга'}
                                min={conditions.lease_term.min}
                                max={conditions.lease_term.max}
                                onChangeCB={onChangeLeaseTerm}
                                indicator={'мес.'}/>
                </div>
                <div className={s.fieldsetRow}>
                    <AccentBlock title={'Сумма договора лизинга'} totalSum={totalSum} currency={'₽'}/>
                    <AccentBlock title={'Ужемасячный платеж от'} totalSum={monthlyPayment} currency={'₽'}/>
                </div>
                <div className={s.fieldsetBtn}>
                    <Button value={'Оставить заявку'} onClick={onclickHandler}/>
                </div>
            </>}
        </form>
    );
};

export default Calculator;