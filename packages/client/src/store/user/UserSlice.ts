import { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { UserAction } from './UserActions'

interface UserState {
  user: User | null
  isAuth: boolean
  isLoading: boolean
  userError?: string
  authError?: string
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    const { addCase } = builder
    addCase(UserAction.get.fulfilled, (state, action) => {
      state.isLoading = false
      state.userError = ''
      state.isAuth = true
      state.user = action.payload
    })
    addCase(UserAction.get.pending, (state) => {
      state.isLoading = true
    })
    addCase(UserAction.get.rejected, (state, action) => {
      state.isLoading = false
      state.userError = action.payload
    })
    addCase(UserAction.update.fulfilled, (state, action) => {
      state.isLoading = false
      state.authError = ''
      state.user = action.payload
    })
    addCase(UserAction.update.pending, (state) => {
      state.isLoading = true
    })
    addCase(UserAction.update.rejected, (state, action) => {
      state.isLoading = false
      state.authError = action.payload
    })
    addCase(UserAction.login.fulfilled, (state) => {
      state.isLoading = false
      state.authError = ''
      state.isAuth = true
    })
    addCase(UserAction.login.pending, (state) => {
      state.isLoading = true
    })
    addCase(UserAction.login.rejected, (state, action) => {
      state.isLoading = false
      state.authError = action.payload
    })
    addCase(UserAction.logout.fulfilled, (state) => {
      state.isLoading = false
      state.authError = ''
      state.isAuth = false
      state.user = null
    })
    addCase(UserAction.logout.pending, (state) => {
      state.isLoading = true
    })
    addCase(UserAction.logout.rejected, (state, action) => {
      state.isLoading = false
      state.authError = action.payload
    })
    addCase(UserAction.register.fulfilled, (state) => {
      state.isLoading = false
      state.authError = ''
      state.isAuth = true
    })
    addCase(UserAction.register.pending, (state) => {
      state.isLoading = true
    })
    addCase(UserAction.register.rejected, (state, action) => {
      state.isLoading = false
      state.user = null
      state.authError = action.payload
    })
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
