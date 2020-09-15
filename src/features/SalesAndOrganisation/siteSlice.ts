import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getSitesData } from 'api/Apis'
import { AppThunk } from 'app/store'


export interface Site {
    email: any //"admin@gmail.com",
    intime: any //"2020-09-14 20:28:34",
    site_id: any //"arj1600095514",
    mobileno: any //"123456789",
    name: any //"arjunp",
    purpose: any //"tomeet",
    scheduletime: any //"2020-09-12 15:00"
    tomeet: any //"arjun2"
}
export interface SitesResult {
    //pageLinks: Links | null
    pageCount: number
    sites: Site[]
}

interface SiteState {
    sites: Site[]
    sitesById: Record<string, Site>
    currentPageSites: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const sitesInitialState: SiteState = {
    sites: [],
    sitesById: {},
    currentPageSites: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
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
            state.sites.map(site => (state.sitesById[site.site_id]=site))
        },
        getSitesFailure: loadingFailed,
    }
})

export const {
    getSitesStart,
    getSitesSuccess,
    getSitesFailure
} = sites.actions

export default sites.reducer

export const fetchSites = (
    page?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getSitesStart())
        const sites = await getSitesData()

        dispatch(getSitesSuccess(sites))
    } catch (err) {
        dispatch(getSitesFailure(err.toString()))
    }
}

