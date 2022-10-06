import {combineReducers} from 'redux';
import {appReducer} from '../features/Application';
import {calculatorReducer} from '../features/Сalculator';


export const rootReducer = combineReducers({
    app: appReducer,
    calculator: calculatorReducer
})