import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
    open: boolean,
    message: string,
    vertical: string,
    horizontal: string,
}

const snackbarInitialState: SnackbarState = {
    open: false,
    message: '',
    vertical: 'bottom',
    horizontal: 'center',
}

const SnackbarSlice = createSlice({
    name: 'snackbar',
    initialState: snackbarInitialState,
    reducers: {
        startSnackbar(state: SnackbarState, { payload }: PayloadAction<any>) {
            const {message} = payload
            state.open = true
            state.message = message
        },
        stopSnackbar(state: SnackbarState) {
            state.open = false
        }
    }
})

export const {
    startSnackbar,
    stopSnackbar
} = SnackbarSlice.actions

export default SnackbarSlice.reducer
