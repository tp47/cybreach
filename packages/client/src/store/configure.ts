import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/UserSlice'

const rootReducer = combineReducers({
  user: userReducer,
})

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
