import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/UserSlice'
import themeSlice from './theme/themeSlice'

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeSlice,
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
