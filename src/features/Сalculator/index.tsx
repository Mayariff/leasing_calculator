import {calculatorAsyncActions, slice} from "./Calculator-reducer";
import Calculator from "./Calculator";

const calculatorReducer = slice.reducer
const actions = slice.actions

const calculatorActions = {
    ...actions,
    ...calculatorAsyncActions
}


export {
    calculatorReducer,
    calculatorActions,
    Calculator
}