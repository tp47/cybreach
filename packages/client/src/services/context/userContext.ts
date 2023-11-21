import { createContext, Dispatch, SetStateAction } from 'react'
import { User } from '@/types'

type ContextType = {
  currentUser: User | null
  setCurrentUser: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<ContextType>({
  currentUser: null,
  // eslint-disable-next-line
  setCurrentUser: () => {},
})

export default UserContext
