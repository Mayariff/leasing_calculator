import React from 'react';
import s from './Spinner.module.scss'

type propsType = {
    color?: string
}

const Spinner = ({color}: propsType) => {

    const spinnerColor = {
        stroke: `${color}`
    }

    return (
        <svg className={s.spinner} viewBox="0 0 50 50" style={spinnerColor}>
            <circle className={s.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
    );
};

export default Spinner;