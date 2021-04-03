import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getVisitorConfigData } from 'api/Apis'
import { AppThunk } from 'app/store'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'


export interface VisitorConfig {
    key: string,
    value: boolean
}
export interface VisitorConfigResult {
    //pageLinks: Links | null
    pageCount: number,
    visitorConfigs: VisitorConfig[],
}

interface VisitorConfigState {
    visitorConfigs: VisitorConfig[],
    visitorConfigsById: Record<string, VisitorConfig>,
    pageCount: number,
    isLoading: boolean,
    error: string | null,
}

const visitorConfigsInitialState: VisitorConfigState = {
    visitorConfigs: [],
    visitorConfigsById: {},
    pageCount: 0,
    isLoading: false,
    error: null
}

function startLoading(state: VisitorConfigState) {
    state.isLoading = true
}

function loadingFailed(state: VisitorConfigState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const visitorConfig = createSlice({
    name: 'visitorConfig',
    initialState: visitorConfigsInitialState,
    reducers: {

        getVisitorConfigsStart: startLoading,
        getVisitorConfigsSuccess(state, { payload }: PayloadAction<VisitorConfigResult>) {
            const { pageCount, visitorConfigs } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.visitorConfigs = visitorConfigs
            // @ts-ignore
            state.visitorConfigs.map(visitorConfig => (state.visitorConfigsById[visitorConfig.key] = visitorConfig))
        },
        getVisitorConfigsFailure: loadingFailed,
        setVisitorConfig(state, { payload }: PayloadAction<any>) {
            const { key, value } = payload
            state.visitorConfigs.find(i => i.key === key) ? state.visitorConfigs.find(i => i.key === key).value = value : state.visitorConfigs.push({ key: key, value: value })
            state.visitorConfigs.map(visitorConfig => (state.visitorConfigsById[visitorConfig.key] = visitorConfig))
        }
    }
})

export const {
    getVisitorConfigsStart,
    getVisitorConfigsSuccess,
    getVisitorConfigsFailure,
    setVisitorConfig
} = visitorConfig.actions

export default visitorConfig.reducer

export const fetchVisitorConfigs = (
): AppThunk => async dispatch => {
    try {
        dispatch(getVisitorConfigsStart())
        const visitorConfigs = await getVisitorConfigData()

        // dispatch(getVisitorConfigsSuccess(visitorConfigs))
    } catch (err) {
        dispatch(getVisitorConfigsFailure(err.toString()))
    }
}

export const saveVisitorConfig = (
    visitorConfig: any,
    callback?: (() => void)
): AppThunk => async dispatch => {
    try {
        dispatch(getBackdropStart())
        //await createVisitorConfig(visitorConfig)
        //  .then(() => dispatch(getBackdropStop())).catch(() => dispatch(getBackdropStop()))
        //return setInputState(defaultInputState)
        callback && callback();
        //dispatch(saveInvitesSuccess(invites))
    } catch (err) {
        dispatch(getBackdropStop())
    }
}
