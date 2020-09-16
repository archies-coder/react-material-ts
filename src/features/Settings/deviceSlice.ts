import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getDevicesData } from 'api/Apis'
import { AppThunk } from 'app/store'


export interface Device {
    createdOn: any,
    devicename: any,
    iosversion: any,
    pincode: any,
    udid: any
}
export interface DevicesResult {
    //pageLinks: Links | null
    pageCount: number
    devices: Device[]
}

interface DeviceState {
    devices: Device[]
    devicesById: Record<string, Device>
    currentPageDevices: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const devicesInitialState: DeviceState = {
    devices: [],
    devicesById: {},
    currentPageDevices: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
}

function startLoading(state: DeviceState) {
    state.isLoading = true
}

function loadingFailed(state: DeviceState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const devices = createSlice({
    name: 'devices',
    initialState: devicesInitialState,
    reducers: {

        getDevicesStart: startLoading,
        getDevicesSuccess(state, { payload }: PayloadAction<DevicesResult>) {
            const { pageCount, devices } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.devices = devices
            // @ts-ignore
            state.devices.map(device => (state.devicesById[device.udid] = device))
        },
        getDevicesFailure: loadingFailed,
    }
})

export const {
    getDevicesStart,
    getDevicesSuccess,
    getDevicesFailure
} = devices.actions

export default devices.reducer

export const fetchDevices = (
    page?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getDevicesStart())
        const devices = await getDevicesData()

        dispatch(getDevicesSuccess(devices))
    } catch (err) {
        dispatch(getDevicesFailure(err.toString()))
    }
}

