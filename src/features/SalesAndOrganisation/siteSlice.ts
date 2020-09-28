import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { createSite, getSitesData } from 'api/Apis'
import { AppThunk } from 'app/store'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'


export interface Site {
    address: any,//Mumbai,
    checkinpoint: any,//Gate 1,
    createdOn: any,//2020-09-27 16:10:07,
    sitename: any,//test
}
export interface SitesResult {
    //pageLinks: Links | null
    pageCount: number
    sites: Site[]
}

export interface SiteInputState {
    sitename: string
    address: string
    checkinpoint: string
}

export const defaultInputState: SiteInputState = {
    sitename: '',
    address: '',
    checkinpoint: '',
}

interface SiteState {
    sites: Site[]
    sitesById: Record<string, Site>
    currentPageSites: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
    currentSite: SiteInputState
}

const sitesInitialState: SiteState = {
    sites: [],
    sitesById: {},
    currentPageSites: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    currentSite: defaultInputState
}

function startLoading(state: SiteState) {
    state.isLoading = true
}

function loadingFailed(state: SiteState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const sites = createSlice({
    name: 'sites',
    initialState: sitesInitialState,
    reducers: {

        getSitesStart: startLoading,
        getSitesSuccess(state, { payload }: PayloadAction<SitesResult>) {
            const { pageCount, sites } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.sites = sites
            // @ts-ignore
            state.sites.map(site => (state.sitesById[site.site_id] = site))
        },
        getSitesFailure: loadingFailed,
        setCurrentSite(state, { payload }: PayloadAction<any>) {
            state.currentSite = payload
        }
    }
})

export const {
    getSitesStart,
    getSitesSuccess,
    getSitesFailure,
    setCurrentSite
} = sites.actions

export default sites.reducer

export const fetchSites = (
    page?: number
    , count?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getSitesStart())
        const sites = await getSitesData(page, count)

        dispatch(getSitesSuccess(sites))
    } catch (err) {
        dispatch(getSitesFailure(err.toString()))
    }
    }

export const saveSite = (
    site: any,
    callback?: (() => void)
): AppThunk => async dispatch => {
    try {
        dispatch(getBackdropStart())
        await createSite(site)
            .then(() => dispatch(getBackdropStart())).catch(() => dispatch(getBackdropStop()))
        //return setInputState(defaultInputState)
        callback && callback();
        //dispatch(saveInvitesSuccess(invites))
    } catch (err) {
        dispatch(getBackdropStop())
    }
}

