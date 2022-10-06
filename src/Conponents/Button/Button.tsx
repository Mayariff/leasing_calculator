import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './Button.module.scss'
import Spinner from '../Spinner/Spinner';
import {useAppSelector} from '../../utils/redux-utils';
import {selectError, selectStatus} from '../../features/Application/selectors';


type SuperButtonPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {}

const Button: React.FC<SuperButtonPropsType> = ({className, ...props}) => {
    const appStatus = useAppSelector(selectStatus)
    const appError = useAppSelector(selectError)

    const btnStyle = appStatus === 'loading' ? `${s.button} ${s.loading}` : s.button

    return (<div className={s.container}>
            <input type={'submit'} className={btnStyle} {...props} disabled={appStatus === 'loading' || !!appError}/>
            {appStatus === 'loading' && <div className={s.spinner}><Spinner color={'#fff'}/></div>}
        </div>
    );
};

export default Button;