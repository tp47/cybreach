import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/UserSlice'

const rootReducer = combineReducers({
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = (preloadedState: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
