import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { createCheckInPoint, getCheckInPointsData } from 'api/Apis'
import { AppThunk } from 'app/store'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'
import { startSnackbar } from 'app/SnackbarSlice'


export interface CheckInPoint {
    checkinpoint: any,//Gate 1,
    createdOn: any,//2020-09-27 16:12:00,
    device: any,//tab,
    sitename: any,//test
}
export interface CheckInPointsResult {
    //pageLinks: Links | null
    pageCount: number,
    checkInPoints: CheckInPoint[],
}
export interface CheckInPointInputState {
    sitename: string,
    device: string,
    checkinpoint: string,
}
export const defaultInputState: CheckInPointInputState = {
    sitename: '',
    device: '',
    checkinpoint: '',
}

interface CheckInPointState {
    checkInPoints: CheckInPoint[],
    checkInPointsById: Record<string, CheckInPoint>,
    currentPageCheckInPoints: number[],
    pageCount: number,
    pageLinks: Links | null,
    isLoading: boolean,
    error: string | null,
    currentCheckInPoint: CheckInPointInputState

}

const checkInPointsInitialState: CheckInPointState = {
    checkInPoints: [],
    checkInPointsById: {},
    currentPageCheckInPoints: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    currentCheckInPoint: defaultInputState
}

function startLoading(state: CheckInPointState) {
    state.isLoading = true
}

function loadingFailed(state: CheckInPointState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const checkInPoint = createSlice({
    name: 'checkInPoints',
    initialState: checkInPointsInitialState,
    reducers: {

        getCheckInPointsStart: startLoading,
        getCheckInPointsSuccess(state, { payload }: PayloadAction<CheckInPointsResult>) {
            const { pageCount, checkInPoints } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.checkInPoints = checkInPoints
            // @ts-ignore
            state.checkInPoints.map(checkInPoint => (state.checkInPointsById[checkInPoint.checkInPoint_id] = checkInPoint))
        },
        getCheckInPointsFailure: loadingFailed,
        setCurrentCheckInPoint(state, { payload }: PayloadAction<CheckInPointInputState>) {
            state.currentCheckInPoint = payload
        }
    }
})

export const {
    getCheckInPointsStart,
    getCheckInPointsSuccess,
    getCheckInPointsFailure,
    setCurrentCheckInPoint
} = checkInPoint.actions

export default checkInPoint.reducer

export const fetchCheckInPoints = (
    page?: number
    , count?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getCheckInPointsStart())
        const checkInPoints = await getCheckInPointsData(page, count)

        dispatch(getCheckInPointsSuccess(checkInPoints))
    } catch (err) {
        dispatch(getCheckInPointsFailure(err.toString()))
    }
}

export const saveCheckInPoint = (
    site: any,
    callback?: (() => void)
): AppThunk => async dispatch => {
    try {
        dispatch(getBackdropStart())
        await createCheckInPoint(site)
            .then(() => {
                dispatch(getBackdropStop())
                dispatch(startSnackbar({ message: 'Check In Point created' }))
            })
            .catch(() => {
                dispatch(getBackdropStop())
                dispatch(startSnackbar({ message: 'Something went wrong' }))
            })
        //return setInputState(defaultInputState)
        callback && callback();
        //dispatch(saveInvitesSuccess(invites))
    } catch (err) {
        dispatch(getBackdropStop())
        dispatch(startSnackbar({ message: 'Something went wrong' }))
    }
}
