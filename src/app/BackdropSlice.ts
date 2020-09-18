import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackdropState {
    mask: boolean;
}

const backdropInitialState: BackdropState = {
    mask: false
}

function startLoading(state: BackdropState) {
    state.mask = true
}
function stopLoading(state: BackdropState) {
    state.mask = false
}

const BackDropSlice = createSlice({
    name: 'backdrop',
    initialState: backdropInitialState,
    reducers: {
        getBackdropStart: startLoading,
        getBackdropStop: stopLoading,
    }
})

export const {
    getBackdropStart,
    getBackdropStop
} = BackDropSlice.actions

export default BackDropSlice.reducer
