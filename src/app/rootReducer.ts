import { combineReducers } from '@reduxjs/toolkit'


import homeReducer from 'features/Home/homeSlice'
import visitorReducer from 'features/Home/visitorSlice'
import inviteReducer from 'features/Invites/inviteSlice'
import employeeReducer from 'features/Employees/employeeSlice'
import siteReducer from 'features/SalesAndOrganisation/siteSlice'
import deviceReducer from 'features/Settings/deviceSlice'

const rootReducer = combineReducers({
  home: homeReducer,
  visitors: visitorReducer,
  invites: inviteReducer,
  employees: employeeReducer,
  sites: siteReducer,
  devices: deviceReducer

})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
