import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { VisitorInfo, VisitorsResult, getVisitorInfo, getVisitorData } from 'api/Apis'
import { AppThunk } from 'app/store'



interface VisitorState {
    visitors: any[]
    visitorsById: any,
    currentVisitor: any
    currentPageVisitors: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const visitorsInitialState: VisitorState = {
    visitors: [],
    visitorsById: {},
    currentVisitor: {
        id: 0,
        avatar: '',
        name: '',
        mobileNo: '',
        personToMeet: '',
        purpose: '',
        inTime: '',
        outTime: '',
        type: '',
        noOfVisitors: '',
        city: '',
        email: '',
        visitorCompany: '',
        country: '',
        site: '',
        host: '',
        gender: ''
    },
    currentPageVisitors: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
}

function startLoading(state: VisitorState) {
    state.isLoading = true
}

function loadingFailed(state: VisitorState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const visitors = createSlice({
    name: 'visitors',
    initialState: visitorsInitialState,
    reducers: {

        getVisitorsStart: startLoading,
        getVisitorsSuccess(state, { payload }: PayloadAction<VisitorsResult>) {
            const { pageCount, visitors } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.visitors = visitors.map((obj, i) => ({
                ...obj, id: i
            }))
            // @ts-ignore
            state.visitorsById = state.visitors.map(visitor => ({ ...visitor, id: visitor.id }))
        },
        getVisitorsFailure: loadingFailed,
        setCurrentVisitor(state, { payload }: PayloadAction<any>){
            state.currentVisitor = payload
        }
    }
})

export const {
    getVisitorsStart,
    getVisitorsSuccess,
    getVisitorsFailure,
    setCurrentVisitor
} = visitors.actions

export default visitors.reducer

export const fetchVisitors = (
    page?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getVisitorsStart())
        const visitors = await getVisitorData()

        dispatch(getVisitorsSuccess(visitors))
    } catch (err) {
        dispatch(getVisitorsFailure(err.toString()))
    }
}

