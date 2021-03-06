import { combineReducers } from '@reduxjs/toolkit'


import homeReducer from 'features/Home/homeSlice'
import backDropReducer from 'app/BackdropSlice'
import snackBarReducer from 'app/SnackbarSlice'
import visitorReducer from 'features/Home/visitorSlice'
import inviteReducer from 'features/Invites/inviteSlice'
import employeeReducer from 'features/Employees/employeeSlice'
import siteReducer from 'features/SalesAndOrganisation/siteSlice'
import deviceReducer from 'features/Settings/deviceSlice'
import userReducer from 'features/UserManagement/userSlice'
import authReducer from 'features/auth/AuthSlice'
import notificationReducer from 'features/Settings/NotificationSlice'
import checkInPointReducer from 'features/SalesAndOrganisation/checkInPointSlice'
import visitorConfigReducer from 'features/Settings/visitorConfigSlice'
import contractorReducer from 'features/contractor/contractorSlice'

const rootReducer = combineReducers({
  backdrop: backDropReducer,
  snackbar: snackBarReducer,
  home: homeReducer,
  visitors: visitorReducer,
  invites: inviteReducer,
  employees: employeeReducer,
  sites: siteReducer,
  devices: deviceReducer,
  users: userReducer,
  auth: authReducer,
  notifications:notificationReducer,
  checkinpoints:checkInPointReducer,
  visitorConfig: visitorConfigReducer,
  contractors: contractorReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
