import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getCheckInPointsData } from 'api/Apis'
import { AppThunk } from 'app/store'


export interface CheckInPoint {
    checkinpoint: any,//Gate 1,
    createdOn: any,//2020-09-27 16:12:00,
    device: any,//tab,
    sitename: any,//test
}
export interface CheckInPointsResult {
    //pageLinks: Links | null
    pageCount: number
    checkInPoints: CheckInPoint[]
}

interface CheckInPointState {
    checkInPoints: CheckInPoint[]
    checkInPointsById: Record<string, CheckInPoint>
    currentPageCheckInPoints: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const checkInPointsInitialState: CheckInPointState = {
    checkInPoints: [],
    checkInPointsById: {},
    currentPageCheckInPoints: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
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
    }
})

export const {
    getCheckInPointsStart,
    getCheckInPointsSuccess,
    getCheckInPointsFailure
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

