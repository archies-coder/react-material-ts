import { combineReducers } from '@reduxjs/toolkit'


import homeReducer from 'features/Home/homeSlice'


const rootReducer = combineReducers({
  home: homeReducer,
  
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
