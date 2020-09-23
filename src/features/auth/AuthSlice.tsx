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
    name: string
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
    name: '',
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
        getAuthStatus(state: AuthState){
            if (localStorage.token) state.isLoggedIn = true
        },
        getSignUpSuccess(state: AuthState, { payload }: PayloadAction<any>) {
            console.log(payload)
        },
        setAuthUser(state: AuthState, { payload }: PayloadAction<any>){
            const { token, userType, name } = payload
            if (token) {
                state.token = token
                localStorage.setItem('token', token)
                state.isLoggedIn = true
                state.userType = userType
                state.name = name
            }
        },
        getSignInSuccess(state: AuthState, { payload }: PayloadAction<any>) {
            console.log(payload)
            const { token, usertype, name } = payload.data
            if (token) {
                state.token = token
                localStorage.setItem('token', token)
                state.isLoggedIn = true
                state.userType = usertype
                state.name = name
                sessionStorage.setItem('authUser', JSON.stringify({
                    "token":token,
                    "userType":usertype,
                    "name":name
                }));
            }
        },
        getAuthFailure: stopLoading,
        setCurrentSignUpInput(state: AuthState, {payload}: PayloadAction<ISignUpInputState>) {
            state.currentSignUpInput = payload
        },
        setCurrentSignInInput(state, {payload}: PayloadAction<ISignInInputState>) {
            state.currentSignInInput = payload
        },
        resetSignUpInput(state: AuthState) {
            state.currentSignUpInput = InitialSignUpState
        },
        resetSignInInput(state: AuthState) {
            state.currentSignInInput = InitialSignInState
        },
        logout(state: AuthState) {
            debugger
            state = authInitialState
            localStorage.removeItem('token')
            sessionStorage.removeItem('authUser')
        }
    }
})

export const {
    getAuthStart,
    getAuthStatus,
    getSignUpSuccess,
    getSignInSuccess,
    getAuthFailure,
    setCurrentSignInInput,
    setCurrentSignUpInput,
    resetSignUpInput,
    resetSignInInput,
    logout,
    setAuthUser
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

export const outhUser = (
    user: any
): AppThunk => async dispatch => {
    dispatch(setAuthUser(user))
}
