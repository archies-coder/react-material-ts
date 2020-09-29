import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getInvitesData, createInvite, getPurpose, getInOfficeInviteData } from 'api/Apis'
import { AppThunk } from 'app/store'
import {getBackdropStart, getBackdropStop} from 'app/BackdropSlice'
import { fetchSites } from 'features/SalesAndOrganisation/siteSlice'
import { getPurposeSuccess } from 'features/Home/visitorSlice'


export interface Invite {
    email: any //"admin@gmail.com",
    intime: any //"2020-09-14 20:28:34",
    invite_id: any //"arj1600095514",
    mobileno: any //"123456789",
    name: any //"arjunp",
    purpose: any //"tomeet",
    scheduletime: any //"2020-09-12 15:00"
    tomeet: any //"arjun2"
}
export interface InvitesResult {
    //pageLinks: Links | null
    pageCount: number
    invites: Invite[]
}

interface InviteState {
    invites: Invite[]
    invitesById: Record<string, Invite>
    currentPageInvites: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const invitesInitialState: InviteState = {
    invites: [],
    invitesById: {},
    currentPageInvites: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
}

function startLoading(state: InviteState) {
    state.isLoading = true
}

function loadingFailed(state: InviteState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const invites = createSlice({
    name: 'invites',
    initialState: invitesInitialState,
    reducers: {

        getInvitesStart: startLoading,
        getInvitesSuccess(state, { payload }: PayloadAction<InvitesResult>) {
            const { pageCount, invites  } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.invites = invites
            // @ts-ignore
            state.invites.map(invite => (state.invitesById[invite.invite_id]=invite))
        },
        getInvitesFailure: loadingFailed,
    }
})

export const {
    getInvitesStart,
    getInvitesSuccess,
    getInvitesFailure
} = invites.actions

export default invites.reducer

export const fetchInvites = (
    page?: number,
    count?: number,
    visitor?: string,
    purpose?: string,
    site?: string
): AppThunk => async dispatch => {
    try {
        dispatch(fetchSites())
        dispatch(getInvitesStart())
        const invites = await getInvitesData(page,count,visitor,purpose,site)

        dispatch(getInvitesSuccess(invites))
        const pur = await getPurpose()
        dispatch(getPurposeSuccess(pur))
    } catch (err) {
        dispatch(getInvitesFailure(err.toString()))
    }
}

export const saveInvite = (
    invite: any,
    callback?:Function
): AppThunk => async dispatch => {
    try {
        //dispatch(saveInviteStart())
        dispatch(getBackdropStart())
        await createInvite(invite)
            .then(() => dispatch(getBackdropStop())).catch(() => dispatch(getBackdropStop()))
        //return setInputState(defaultInputState)
        callback && callback();
        //dispatch(saveInvitesSuccess(invites))
    } catch (err) {
        //dispatch(saveInvitesFailure(err.toString()))
        dispatch(getBackdropStop())
    }
}


export const fetchInOfficeInvites = (
    page?: number
    , count?: number
): AppThunk => async dispatch => {
    try {
        dispatch(fetchSites())
        dispatch(getInvitesStart())
        const visitors = await getInOfficeInviteData()
        dispatch(getInvitesSuccess(visitors))
        
        const purpose = await getPurpose()
        dispatch(getPurposeSuccess(purpose))
    } catch (err) {
        dispatch(getInvitesFailure(err.toString()))
    }
}
