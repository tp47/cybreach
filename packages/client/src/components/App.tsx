import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { router } from '@/router'
import { UserContext } from '@/services/context'
import { AuthApi } from '@/services/api'
import { User } from '@/types'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    AuthApi.getUser().then((data) => {
      setCurrentUser(data)
    })
  }, [])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

export default App
