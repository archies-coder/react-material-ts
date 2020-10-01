import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { createDevice, getDevicesData } from 'api/Apis'
import { AppThunk } from 'app/store'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'
import { startSnackbar } from 'app/SnackbarSlice'


export interface Device {
    createdOn: any,
    devicename: any,
    iosversion: any,
    appversion:any,
    checkinpoint:any,
    pincode: any,
    udid: any
}
export interface DevicesResult {
    //pageLinks: Links | null
    pageCount: number
    devices: Device[],
}

interface DeviceState {
    devices: Device[]
    devicesById: Record<string, Device>
    currentDevice: any
    currentPageDevices: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const devicesInitialState: DeviceState = {
    devices: [],
    devicesById: {},
    currentDevice: {},
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
        setCurrentDevice(state, { payload }: PayloadAction<any>){
            state.currentDevice = payload
        }
    }
})

export const {
    getDevicesStart,
    getDevicesSuccess,
    getDevicesFailure,
    setCurrentDevice
} = devices.actions

export default devices.reducer

export const fetchDevices = (
    page?: number
    , count?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getDevicesStart())
        const devices = await getDevicesData(page,count)

        dispatch(getDevicesSuccess(devices))
    } catch (err) {
        dispatch(getDevicesFailure(err.toString()))
    }
}

export const saveDevice = (
    device: any,
    callback?: (() => void)
): AppThunk => async dispatch => {
    try {
        dispatch(getBackdropStart())
        await createDevice(device)
            .then(() => {
                dispatch(getBackdropStop())
                dispatch(startSnackbar({message: 'Device created'}))
            }).catch(() => {
                dispatch(getBackdropStop())
                dispatch(startSnackbar({ message: 'Something went wrong'}))
            })
            //return setInputState(defaultInputState)
            callback && callback();
            //dispatch(saveInvitesSuccess(invites))
        } catch (err) {
            dispatch(getBackdropStop())
            dispatch(startSnackbar({ message: 'Something went wrong'}))
    }
}
