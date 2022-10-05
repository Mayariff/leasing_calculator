import React, {ChangeEventHandler} from 'react';
import s from './SmartInput.module.scss'

type currencyType = '₽' | '$' | '€'

//value, Title,
// indicator: month money percent
//min value , max value
type propsType = {
    fieldTitle: string
    indicator: currencyType | '%' | string
    value?: number
}

const SmartInput = ({fieldTitle, indicator, value}: propsType) => {

    //const [value, setValue] = useState<number>(0)
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        //setValue(+e.currentTarget.value)
    }

    const containerClass = value === 5 ? `${s.container} ${s.disabled}` : s.container

    const indicatorValue = indicator === '%' ? `13${indicator}` : indicator


    const indicatorStyle = indicator === '₽' || indicator === '$' || indicator === '€' ? `${s.indicator} ${s.currency}` : (indicator === '%' ? `${s.indicator} ${s.percent}` : s.indicator)

    return (
        <div className={containerClass}>
            <label className={s.label}>{fieldTitle.trim()}</label>

            <div className={s.inputContainer}>
                <div className={indicatorStyle}>{indicatorValue}</div>
                <input className={s.textInput} type={'number'}
                       onChange={onChangeHandler}
                       value={value}/>
                <div className={s.trackContainer}>
                    <input className={s.range} type={'range'}
                           onChange={onChangeHandler}
                           value={value}/>
                </div>
                <div className={s.thumbContainer}>
                    <input className={s.thumb} type={'range'}
                           onChange={onChangeHandler}
                           value={value}/>
                </div>
            </div>
        </div>
    );
};

export default SmartInput;