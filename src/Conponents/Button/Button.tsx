import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.scss'
import Spinner from "../Spinner/Spinner";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type SuperButtonPropsType = DefaultButtonPropsType & {
    btnName?: string
}

const Button: React.FC<SuperButtonPropsType> = ({className, btnName, color, ...props}) => {
    const isLoading = true
    //const finalClassName = props.disabled ? `${s.default} ${s.disabled}` : (color === 'second' ? `${s.default} ${s.active} ${s.red}` : `${s.default} ${s.active}`)


    return (<div className={s.container}>
            <button className={`${s.button} ${s.loading}`} {...props}>
                {btnName}
            </button>
            {isLoading && <div className={s.spinner}><Spinner color={'#fff'}/></div>}
        </div>
    );
};

export default Button;