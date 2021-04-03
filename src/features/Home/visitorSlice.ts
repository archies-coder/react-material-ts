import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { VisitorsResult, getVisitorData, getPurpose, getInOfficeVisitorData } from 'api/Apis'
import { AppThunk } from 'app/store'
import { fetchSites } from 'features/SalesAndOrganisation/siteSlice'

export interface VisitorInfo {
    answer1: any,
    answer2: any,
    answer3: any,
    answer4: any,
    answer5: any,
    belongings: any,
    checkin_id: any,
    city: any,
    company: any,
    country: any,
    email: any,
    gender: any,
    idCardImagePath: any,
    idtype: any,
    intime: any,
    mobile: any,
    name: any,
    ndastatus: any,
    noofvisitor: any,
    organisation: any,
    outime: any,
    policycheckstatus: any,
    profilePicPath: any,
    purpose: any,
    signaturePath: any,
    site: any,
    tomeet: any,
    usertype: any,
    vehicleno: any
}

export const defaultVisitor: VisitorInfo = {
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    belongings: '',
    checkin_id: '',
    city: '',
    company: '',
    country: '',
    email: '',
    gender: '',
    idCardImagePath: '',
    idtype: '',
    intime: '',
    mobile: '',
    name: '',
    ndastatus: '',
    noofvisitor: '',
    organisation: '',
    outime: '',
    policycheckstatus: '',
    profilePicPath: '',
    purpose: '',
    signaturePath: '',
    site: '',
    tomeet: '',
    usertype: '',
    vehicleno: ''
}

interface VisitorState {
    visitors: VisitorInfo[],
    visitorsById: any,
    currentVisitor: VisitorInfo,
    currentPageVisitors: number[],
    pageCount: number,
    pageLinks: Links | null,
    isLoading: boolean,
    error: string | null,
    purpose: any[],
    filter: any,
}

const visitorsInitialState: VisitorState = {
    visitors: [],
    visitorsById: {},
    currentVisitor: defaultVisitor,
    currentPageVisitors: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    purpose: [],
    filter: { visitor: "", purpose: "All Purpose", site: "All Sites" }
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
            state.visitors = visitors
            // @ts-ignore
            state.visitors.map(visitor => (state.visitorsById[visitor.checkin_id] = visitor))
            //state.visitorsById = state.visitors.map(visitor => ({ ...visitor, id: visitor.id }))
        },
        getPurposeSuccess(state, { payload }: PayloadAction<any>) {
            const { purpose } = payload
            state.purpose = purpose
        },
        getVisitorsFailure: loadingFailed,
        setCurrentVisitor(state, { payload }: PayloadAction<VisitorInfo>) {
            state.currentVisitor = payload
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = { ...state.filter, ...payload }
        }
    }
})

export const {
    getVisitorsStart,
    getVisitorsSuccess,
    getVisitorsFailure,
    setCurrentVisitor,
    getPurposeSuccess,
    setFilter
} = visitors.actions

export default visitors.reducer

export const fetchVisitors = (
    page?: number,
    count?: number,
    visitor?: string,
    purpose?: string,
    site?: string
): AppThunk => async dispatch => {
    try {
        dispatch(fetchSites())
        dispatch(getVisitorsStart())
        const visitors = await getVisitorData(page, count, visitor, purpose, site)
        dispatch(getVisitorsSuccess(visitors))

        const pur = await getPurpose()
        dispatch(getPurposeSuccess(pur))
    } catch (err) {
        dispatch(getVisitorsFailure(err.toString()))
    }
}

export const fetchInOfficeVisitors = (
    page?: number,
    count?: number,
    visitor?: string,
    purpose?: string,
    site?: string
): AppThunk => async dispatch => {
    try {
        dispatch(fetchSites())
        dispatch(getVisitorsStart())
        const visitors = await getInOfficeVisitorData(page, count, visitor, purpose, site)
        dispatch(getVisitorsSuccess(visitors))

        const pur = await getPurpose()
        dispatch(getPurposeSuccess(pur))
    } catch (err) {
        dispatch(getVisitorsFailure(err.toString()))
    }
}

