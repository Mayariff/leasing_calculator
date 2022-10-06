import React from 'react';
import s from './Title.module.scss'

type propsType = {
    text: string
}
const Title = ({text}: propsType) => {
    return (
        <h1 className={s.title}>
            {text}
        </h1>
    );
};

export default Title;