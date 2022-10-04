import {combineReducers} from "redux";
import {appReducer} from "../features/Application";


export const rootReducer = combineReducers({
    app: appReducer,
    //eventsList: eventsListReducer,
    //event: eventReducer,
    //starters: startersReducer,
    //eventForm: eventFormReducer
})