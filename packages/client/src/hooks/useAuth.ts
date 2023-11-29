import AuthApi from '@/services/api/authApi'
import { User } from '@/types'

type UserContextType = {
  getUser: () => Promise<User>
  loginUser: (data: Partial<User>) => Promise<User>
  registerUser: (data: User) => Promise<User>
  updateUserProfile: (data: Omit<User, 'password'>) => Promise<User>
  logout: () => Promise<null>
}

export const useAuth = (): UserContextType => {
  const getUser = () => AuthApi.getUser()

  const loginUser = (data: Partial<User>) => AuthApi.loginUser(data)

  const registerUser = (data: User) => AuthApi.registerUser(data)

  const updateUserProfile = (user: Omit<User, 'password'>) => AuthApi.updateUserProfile(user)

  const logout = () => AuthApi.logoutUser()

  return {
    getUser,
    loginUser,
    registerUser,
    updateUserProfile,
    logout,
  }
}
