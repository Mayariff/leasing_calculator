import React from 'react';
import AccentBlock from "../Conponents/AccentBlock/AccentBlock";


function App() {
    return (
        <div style={{margin: '20px'}}>
            <AccentBlock title={'Сумма договора лизинга'} totalSum={455} currency={'₽'}/>
        </div>
    );
}

export default App;
