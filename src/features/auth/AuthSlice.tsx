import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signUp } from 'api/Apis';
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice';
import { AppThunk } from 'app/store';

interface ISignInInputState {
    username: string
    password: string
}
interface ISignUpInputState {
    name: string
    username: string
    userType: string
    password: string
}
interface AuthState {
    error: string | null
    isLoading: boolean
    token: string
    userType: string
    isLoggedIn: boolean
    currentSignInInput: ISignInInputState
    currentSignUpInput: ISignUpInputState
}

const InitialSignUpState: ISignUpInputState = {
    name: '',
    username: '',
    userType: '',
    password: '',
}

const InitialSignInState: ISignInInputState = {
    username: '',
    password: '',
}

const authInitialState: AuthState = {
    error: '',
    isLoading: false,
    token: '',
    userType: '',
    isLoggedIn: false,
    currentSignInInput: InitialSignInState,
    currentSignUpInput: InitialSignUpState
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
        getSignUpSuccess(state, { payload }: PayloadAction<any>) {
            console.log(payload)
        },
        getSignInSuccess(state, { payload }: PayloadAction<any>) {
            console.log(payload)
            if (payload.data.token) {
                state.token = payload.data.token
                state.isLoggedIn = true
                state.userType = payload.data.usertype
            }
        },
        getAuthFailure: stopLoading,
        setCurrentSignUpInput(state, {payload}: PayloadAction<ISignUpInputState>) {
            state.currentSignUpInput = payload
        },
        setCurrentSignInInput(state, {payload}: PayloadAction<ISignInInputState>) {
            state.currentSignInInput = payload
        },
        resetSignUpInput(state) {
            state.currentSignUpInput = InitialSignUpState
        },
        resetSignInInput(state) {
            state.currentSignInInput = InitialSignInState
        },
    }
})

export const {
    getAuthStart,
    getSignUpSuccess,
    getSignInSuccess,
    getAuthFailure,
    setCurrentSignInInput,
    setCurrentSignUpInput,
    resetSignUpInput,
    resetSignInInput
} = AuthSlice.actions

export default AuthSlice.reducer

export const doLogin = (
    username: string,
    password: string,
    callback?: () => any
): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart())
        dispatch(getBackdropStart())
        const response = await signIn(username, password)
        dispatch(getSignInSuccess(response))
        callback && callback();
        dispatch(getBackdropStop())
    } catch (err) {
        dispatch(getBackdropStop())
        dispatch(getAuthFailure())
    }
}

export const doRegister = (
    username: string,
    password: string,
    name: string,
    userType: string,
    callback?: () => any
): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart())
        dispatch(getBackdropStart())
        const response = await signUp(username, password, name, userType)
        dispatch(getSignUpSuccess(response))
        callback && callback();
        dispatch(getBackdropStop())
    } catch (err) {
        dispatch(getBackdropStop())
        dispatch(getAuthFailure())
    }
}
