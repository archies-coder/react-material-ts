import { combineReducers } from '@reduxjs/toolkit'


import homeReducer from 'features/Home/homeSlice'
import visitorReducer from 'features/Home/visitorSlice'
import inviteReducer from 'features/Invites/inviteSlice'


const rootReducer = combineReducers({
  home: homeReducer,
  visitors: visitorReducer,
  invites: inviteReducer

})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
