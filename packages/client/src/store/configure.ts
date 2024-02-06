import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/UserSlice'
import themeSlice from './theme/ThemeSlice'
import { ForumAPI } from '@/services/forum/ForumService'

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeSlice,
  [ForumAPI.reducerPath]: ForumAPI.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = (preloadedState: RootState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ForumAPI.middleware),
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
