import { createContext, Dispatch, SetStateAction } from 'react'
import { User } from '@/types'

type ContextType = {
  currentUser: User | null
  isAuth: boolean | null
  setCurrentUser: Dispatch<SetStateAction<User | null>>
  setIsAuth: Dispatch<SetStateAction<boolean | null>>
}

const UserContext = createContext<ContextType>({
  currentUser: null,
  setCurrentUser: (currentUser) => {
    currentUser
  },
  isAuth: null,
  setIsAuth: (isAuth) => {
    isAuth
  },
})

export default UserContext
