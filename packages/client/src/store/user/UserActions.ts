import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthApi } from '@/services/api'
import { User } from '@/types'
import { removeScoreLocal } from '@/services/helpers/score'

type ErrorType = { rejectValue: string }

export const UserAction = {
  get: createAsyncThunk<User, undefined, ErrorType>('user/getUser', async (_, thunkAPI) => {
    try {
      const response = await AuthApi.getUser()
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователя')
    }
  }),

  login: createAsyncThunk<unknown, Partial<User>, ErrorType>(
    'user/loginUser',
    async (loginData, thunkAPI) => {
      try {
        await AuthApi.loginUser(loginData)
      } catch (e) {
        return thunkAPI.rejectWithValue('Ошибка аутентификации')
      }
    }
  ),

  logout: createAsyncThunk<unknown, undefined, ErrorType>(
    'user/logoutUser',
    async (_, thunkAPI) => {
      try {
        await AuthApi.logoutUser()
        removeScoreLocal()
      } catch (e) {
        return thunkAPI.rejectWithValue('Не удалость выйти из профиля')
      }
    }
  ),

  register: createAsyncThunk<User, User, ErrorType>('user/registerUser', async (data, thunkAPI) => {
    try {
      const response = await AuthApi.registerUser(data)
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось зарегистрироваться')
    }
  }),

  update: createAsyncThunk<User, Partial<User>, ErrorType>(
    'user/updateUser',
    async (data, thunkAPI) => {
      try {
        const response = await AuthApi.updateUserProfile(data)
        return response
      } catch (e) {
        return thunkAPI.rejectWithValue('Не удалось обновить данные пользователя')
      }
    }
  ),
}
