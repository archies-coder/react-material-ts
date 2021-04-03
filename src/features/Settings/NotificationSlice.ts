import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

// import { createNotification, getNotificationsData } from 'api/Apis'
import { AppThunk } from 'app/store'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'
import { dataConfig } from './NotificationConfig'
import { isTemplateExpression } from 'typescript'


export interface Notification {
    event: string,
    key?: any,
    sms: any,
    email: any
}

export interface NotificationsResult {
    //pageLinks: Links | null
    notifications: Notification[],
}

interface NotificationState {
    notifications: Notification[],
    notificationById: Record<any, Notification>,
    isLoading: boolean,
    error: string | null,
}

const notificationsInitialState: NotificationState = {
    notifications: dataConfig.map((item, i) => ({ ...item, key: i })),
    notificationById: {},
    isLoading: false,
    error: null
}
notificationsInitialState.notifications.map(item => notificationsInitialState.notificationById[item.key] = item)

function startLoading(state: NotificationState) {
    state.isLoading = true
}

function loadingFailed(state: NotificationState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const notifications = createSlice({
    name: 'notifications',
    initialState: notificationsInitialState,
    reducers: {

        getNotificationsStart: startLoading,
        getNotificationsSuccess(state, { payload }: PayloadAction<NotificationsResult>) {
            const { notifications } = payload
            state.isLoading = false
            state.error = null
            state.notifications = notifications
            // @ts-ignore
            state.notifications.map(notification => (state.notificationsById[notification.key] = notification))
        },
        getNotificationsFailure: loadingFailed,
        setNotification(state, { payload }: PayloadAction<any>) {
            const { id, name, value } = payload
            name === "email" ? state.notificationById[id].email = value : state.notificationById[id].sms = value
        }
    }
})

export const {
    getNotificationsStart,
    getNotificationsSuccess,
    getNotificationsFailure,
    setNotification
} = notifications.actions

export default notifications.reducer

export const fetchNotifications = (
    page?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getNotificationsStart())
        // const notifications = await getNotificationsData()

        // dispatch(getNotificationsSuccess(notifications))
    } catch (err) {
        dispatch(getNotificationsFailure(err.toString()))
    }
}

export const saveNotification = (
    notification: any,
    callback?: (() => void)
): AppThunk => async dispatch => {
    try {
        dispatch(getBackdropStart())
        // await createNotification(notification)
        // .then(() => dispatch(getBackdropStop())).catch(() => dispatch(getBackdropStop()))
        //return setInputState(defaultInputState)
        callback && callback();
        //dispatch(saveInvitesSuccess(invites))
    } catch (err) {
        dispatch(getBackdropStop())
    }
}

export const updateNotification = (
    notification: any,
    callback?: (() => void)
): AppThunk => async dispatch => {
    try {
        // debugger
        //dispatch(getBackdropStart())
        // await createNotification(notification)
        // .then(() => dispatch(getBackdropStop())).catch(() => dispatch(getBackdropStop()))
        //return setInputState(defaultInputState)
        dispatch(setNotification(notification))
        callback && callback();
        //dispatch(saveInvitesSuccess(invites))
    } catch (err) {
        dispatch(getBackdropStop())
    }
}