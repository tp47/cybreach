import { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { UserAction } from './UserActions'

interface UserState {
  user: User | null
  isAuth: boolean
  isLoading: boolean
  error?: string
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { addCase } = builder
    addCase(UserAction.get.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
      state.isAuth = true
      state.user = action.payload
    })
    addCase(UserAction.get.pending, (state) => {
      state.isLoading = true
    })
    addCase(UserAction.get.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    addCase(UserAction.login.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
      state.isAuth = true
    })
    addCase(UserAction.login.pending, (state) => {
      state.isLoading = true
    })
    addCase(UserAction.login.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    builder.addCase(UserAction.logout.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
      state.isAuth = false
      state.user = null
    })
    addCase(UserAction.logout.pending, (state) => {
      state.isLoading = true
    })
    addCase(UserAction.logout.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export default userSlice.reducer
