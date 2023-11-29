import AuthApi from '@/services/api/authApi'
import { User } from '@/types'
import { useCallback } from 'react'

type UserContextType = {
  getUser: () => Promise<User>
  loginUser: (data: Partial<User>) => Promise<User>
  registerUser: (data: User) => Promise<User>
  updateUserProfile: (data: Omit<User, 'password'>) => Promise<User>
  logout: () => Promise<null>
}

export const useAuth = (): UserContextType => {
  const getUser = useCallback(() => AuthApi.getUser(), [])

  const loginUser = useCallback((data: Partial<User>) => AuthApi.loginUser(data), [])

  const registerUser = useCallback((data: User) => AuthApi.registerUser(data), [])

  const updateUserProfile = useCallback(
    (user: Omit<User, 'password'>) => AuthApi.updateUserProfile(user),
    []
  )

  const logout = useCallback(() => AuthApi.logoutUser(), [])

  return {
    getUser,
    loginUser,
    registerUser,
    updateUserProfile,
    logout,
  }
}
