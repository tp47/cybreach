import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { router } from '@/router'
import { UserContext } from '@/services/context'
import { AuthApi } from '@/services/api'
import { User } from '@/types'
import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuth, setIsAuth] = useState<boolean | null>(false)

  useEffect(() => {
    AuthApi.getUser()
      .then((data) => {
        setCurrentUser(data)
        setIsAuth(true)
      })
      .catch(() => setIsAuth(false))
  }, [])

  if (isAuth === null) {
    return <div>Loading</div>
  }

  return isAuth === null ? (
    <div>Loading</div>
  ) : (
    <UserContext.Provider value={{ currentUser, isAuth, setCurrentUser, setIsAuth }}>
      <ErrorBoundary fallback="Error. Check console in dev tools.">
        <RouterProvider router={router} />
      </ErrorBoundary>
    </UserContext.Provider>
  )
}

export default App
