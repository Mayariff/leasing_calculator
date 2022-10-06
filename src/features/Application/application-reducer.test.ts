import {InitialStateType, slice} from './application-reducer'
import {commonActions} from '../common_actions/app-actions';


const {reducer: appReducer} = slice
const {setAppError, setAppStatus} = commonActions


let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppError({error: 'some error'}))
    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatus({status: 'loading'}))
    expect(endState.status).toBe('loading');
})



