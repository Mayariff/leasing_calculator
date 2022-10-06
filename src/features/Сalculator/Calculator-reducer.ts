import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {paramsType} from '../../API/type';
import {ThunkError} from '../../utils/types';
import {commonActions} from '../common_actions/app-actions';
import {calculatorAPI} from '../../API/api';
import {handleAError} from '../../utils/error-utils';


const sendApplication = createAsyncThunk<paramsType, paramsType, ThunkError>('calculator/sendApplication', (params, thunkAPI) => {
    thunkAPI.dispatch(commonActions.setAppStatus({status: 'loading'}))
    try {
        const res = calculatorAPI.createNewApplication(params)
        thunkAPI.dispatch(commonActions.setAppStatus({status: 'succeeded'}))
        return params
    } catch (error) {
        return handleAError({message: `Leasing Application has not been sent`}, thunkAPI)
    }
})

export const slice = createSlice({
    name: 'calculator',
    initialState: {} as paramsType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(sendApplication.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const calculatorAsyncActions = {sendApplication}