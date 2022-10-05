import React, {ButtonHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './Button.module.scss'
import Spinner from "../Spinner/Spinner";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type SuperButtonPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Button: React.FC<SuperButtonPropsType> = ({className,  color, ...props}) => {
    const isLoading = false
    //const finalClassName = props.disabled ? `${s.default} ${s.disabled}` : (color === 'second' ? `${s.default} ${s.active} ${s.red}` : `${s.default} ${s.active}`)


    return (<div className={s.container} >
            <input type={'submit'} className={`${s.button}`} {...props} />
            {/*<button  className={`${s.button} ${s.loading}`} {...props} >
                {btnName}
            </button>*/}
            {isLoading && <div className={s.spinner}><Spinner color={'#fff'}/></div>}
        </div>
    );
};

export default Button;