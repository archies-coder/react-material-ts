import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getHomeStats } from 'api/Apis'
import { AppThunk } from 'app/store'


interface homeStatsState {
  checked_out: number
  in_office: number
  invite_sent: number
  total_visitor: number
  visitors: number[]
  isLoading: boolean
  error: string | null
}

const homeStatsInitialState: homeStatsState = {
  checked_out: 0,
  in_office: 0,
  invite_sent: 0,
  total_visitor: 0,
  visitors: [],
  isLoading: false,
  error: null
}

function startLoading(state: homeStatsState) {
  state.isLoading = true
}

function loadingFailed(state: homeStatsState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const homeStats = createSlice({
  name: 'homeStats',
  initialState: homeStatsInitialState,
  reducers: {

    getHomeStatsStart: startLoading,
    getHomeStatsSuccess(state, { payload }: PayloadAction<homeStatsState>) {
      const { checked_out,
        in_office,
        invite_sent,
        total_visitor,
        visitors,
        isLoading } = payload
      state.checked_out = checked_out
      state.in_office = in_office
      state.invite_sent = invite_sent
      state.total_visitor = total_visitor
      state.isLoading = false
      state.error = null
      state.visitors = visitors
    },
    getHomeStatsFailure: loadingFailed,
  }
})

export const {
  getHomeStatsStart,
  getHomeStatsSuccess,
  getHomeStatsFailure
} = homeStats.actions

export default homeStats.reducer

export const fetchHomeStats = (
  page?: number
): AppThunk => async dispatch => {
  try {
    dispatch(getHomeStatsStart())
    const stats = await getHomeStats()
    dispatch(getHomeStatsSuccess(stats.data))
  } catch (err) {
    dispatch(getHomeStatsFailure(err.toString()))
  }
}

