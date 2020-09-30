import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getContractorData, getPurpose, getInOfficeContractorData } from 'api/Apis'
import { AppThunk } from 'app/store'
import { fetchSites } from 'features/SalesAndOrganisation/siteSlice'

export interface ContractorsResult {
    //pageLinks: Links | null
    pageCount: number
    contractors: ContractorInfo[]
  }
export interface ContractorInfo {
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
    noofcontractor: any,
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

export const defaultContractor: ContractorInfo = {
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
    noofcontractor: '',
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

interface ContractorState {
    contractors: ContractorInfo[]
    contractorsById: any,
    currentContractor: ContractorInfo
    currentPageContractors: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
    purpose: any[],
    filter:any
}

const contractorsInitialState: ContractorState = {
    contractors: [],
    contractorsById: {},
    currentContractor: defaultContractor,
    currentPageContractors: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    purpose: [],
    filter:{contractor:"",purpose:"All Purpose",site:"All Sites"}
}

function startLoading(state: ContractorState) {
    state.isLoading = true
}

function loadingFailed(state: ContractorState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const contractors = createSlice({
    name: 'contractors',
    initialState: contractorsInitialState,
    reducers: {

        getContractorsStart: startLoading,
        getContractorsSuccess(state, { payload }: PayloadAction<ContractorsResult>) {
            const { pageCount, contractors } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.contractors = contractors
            // @ts-ignore
            state.contractors.map(contractor => (state.contractorsById[contractor.checkin_id] = contractor))
            //state.contractorsById = state.contractors.map(contractor => ({ ...contractor, id: contractor.id }))
        },
        getPurposeSuccess(state,{payload}: PayloadAction<any>){
            const { purpose } = payload
            state.purpose = purpose
        },
        getContractorsFailure: loadingFailed,
        setCurrentContractor(state, { payload }: PayloadAction<ContractorInfo>) {
            state.currentContractor = payload
        },
        setFilter(state,{payload}: PayloadAction<any>){
            state.filter = {...state.filter, ...payload}
        }
    }
})

export const {
    getContractorsStart,
    getContractorsSuccess,
    getContractorsFailure,
    setCurrentContractor,
    getPurposeSuccess,
    setFilter
} = contractors.actions

export default contractors.reducer

export const fetchContractors = (
    page?: number
    , count?: number,
    contractor?: string,
    purpose?: string,
    site?: string
): AppThunk => async dispatch => {
    try {
        dispatch(fetchSites())
        dispatch(getContractorsStart())
        const contractors = await getContractorData(page,count,contractor,purpose,site)
        dispatch(getContractorsSuccess(contractors))

        const pur = await getPurpose()
        dispatch(getPurposeSuccess(pur))
    } catch (err) {
        dispatch(getContractorsFailure(err.toString()))
    }
}

export const fetchInOfficeContractors = (
    page?: number
    , count?: number
): AppThunk => async dispatch => {
    try {
        dispatch(fetchSites())
        dispatch(getContractorsStart())
        const contractors = await getInOfficeContractorData()
        dispatch(getContractorsSuccess(contractors))

        const purpose = await getPurpose()
        dispatch(getPurposeSuccess(purpose))
    } catch (err) {
        dispatch(getContractorsFailure(err.toString()))
    }
}

