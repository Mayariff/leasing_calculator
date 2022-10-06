import {AppRootStateType} from '../../utils/types'

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectError = (state: AppRootStateType) => state.app.error


