import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { router } from '@/router'
import { UserContext } from '@/services/context'
import { AuthApi } from '@/services/api'
import { User } from '@/types'
import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { MainLayout } from './templates'
import { LoaderStub } from './atoms'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    AuthApi.getUser()
      .then((data) => {
        setCurrentUser(data)
        setIsAuth(true)
      })
      .catch(() => setIsAuth(false))
  }, [])

  return isAuth === null ? (
    <MainLayout content={<LoaderStub />} />
  ) : (
    <UserContext.Provider value={{ currentUser, isAuth, setCurrentUser, setIsAuth }}>
      <ErrorBoundary fallback="Error. Check console in dev tools.">
        <RouterProvider router={router} />
      </ErrorBoundary>
    </UserContext.Provider>
  )
}

export default App
