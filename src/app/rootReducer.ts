import { combineReducers } from '@reduxjs/toolkit'


import homeReducer from 'features/Home/homeSlice'
import visitorReducer from 'features/Home/visitorSlice'


const rootReducer = combineReducers({
  home: homeReducer,
  visitors:visitorReducer
  
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
