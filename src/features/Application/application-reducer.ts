import {createSlice} from '@reduxjs/toolkit';
import {commonActions} from '../common_actions/app-actions';


export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,

    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(commonActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(commonActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка -запишем текст ошибки сюда
    error: string | null
}
