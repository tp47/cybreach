import { createContext, Dispatch, SetStateAction } from 'react'
import { User } from '@/types'

type ContextType = {
  currentUser: User | null
  isAuth: boolean
  setCurrentUser: Dispatch<SetStateAction<User | null>>
  setIsAuth: Dispatch<SetStateAction<boolean | null>>
}

const UserContext = createContext<ContextType>({
  currentUser: null,
  // eslint-disable-next-line
  setCurrentUser: () => {},
  isAuth: false,
  // eslint-disable-next-line
  setIsAuth: () => {},
})

export default UserContext
