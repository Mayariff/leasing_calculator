import React, {ChangeEventHandler, useState} from 'react';
import s from './SmartInput.module.scss'


//value, Title,
// indicator: month money percent
//min value , max value
type propsType = {
    fieldTitle: string
    value: number
}

const SmartInput = () => {

    const [value, setValue] = useState<number>(0)
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(+e.currentTarget.value)
    }

    const contentValue = {
        content: `${value}`
    }

    const containerClass = value === 5 ? `${s.container} ${s.disabled}` : s.container

    return (
        <div className={containerClass}>
            <label className={s.label}>какая то сумма </label>

            <div className={s.inputContainer} style={contentValue} datatype={`${value}`}>
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