import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getUsersData } from 'api/Apis'
import { AppThunk } from 'app/store'


export interface User {
    email: any //"admin@gmail.com",
    intime: any //"2020-09-14 20:28:34",
    user_id: any //"arj1600095514",
    mobileno: any //"123456789",
    name: any //"arjunp",
    purpose: any //"tomeet",
    scheduletime: any //"2020-09-12 15:00"
    tomeet: any //"arjun2"
}
export interface UsersResult {
    //pageLinks: Links | null
    pageCount: number
    users: User[]
}

interface UserState {
    users: User[]
    usersById: Record<string, User>
    currentPageUsers: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const usersInitialState: UserState = {
    users: [],
    usersById: {},
    currentPageUsers: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
}

function startLoading(state: UserState) {
    state.isLoading = true
}

function loadingFailed(state: UserState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const users = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {

        getUsersStart: startLoading,
        getUsersSuccess(state, { payload }: PayloadAction<UsersResult>) {
            const { pageCount, users } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.users = users
            // @ts-ignore
            state.users.map(user => (state.usersById[user.user_id]=user))
        },
        getUsersFailure: loadingFailed,
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure
} = users.actions

export default users.reducer

export const fetchUsers = (
    page?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getUsersStart())
        const users = await getUsersData()

        dispatch(getUsersSuccess(users))
    } catch (err) {
        dispatch(getUsersFailure(err.toString()))
    }
}

