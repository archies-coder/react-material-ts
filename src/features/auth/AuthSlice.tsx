import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signUp } from 'api/Apis';
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice';
import { AppThunk } from 'app/store';

interface AuthState {
    error: string | null
    isLoading: boolean
    token: string
    userType: string
}

const authInitialState: AuthState = {
    error: '',
    isLoading: false,
    token: '',
    userType: ''
}

function startLoading(state: AuthState) {
    state.isLoading = true
}
function stopLoading(state: AuthState) {
    state.isLoading = false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        getAuthStart: startLoading,
        getAuthSuccess(state, { payload }: PayloadAction<any>) {
            state.token = payload.token
        },
        getAuthFailure: stopLoading,
    }
})

export const {
    getAuthStart,
    getAuthSuccess,
    getAuthFailure
} = AuthSlice.actions

export default AuthSlice.reducer

export const doLogin = (
    username: string,
    password: string
): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart())
        const response = await signIn(username, password)
        dispatch(getAuthSuccess(response))
    } catch (err) {
        dispatch(getAuthFailure())
    }
}

export const doRegister = (
    username: string,
    password: string,
    name: string,
    userType: string
): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart())
        dispatch(getBackdropStart())
        const response = await signUp(username, password, name, userType)
        dispatch(getAuthSuccess(response))
        dispatch(getBackdropStop())
    } catch (err) {
        dispatch(getBackdropStop())
        dispatch(getAuthFailure())
    }
}
