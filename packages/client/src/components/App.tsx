import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { router } from '@/router'
import { UserContext } from '@/services/context'
import { User } from '@/types'
import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { MainLayout } from './templates'
import { LoaderStub } from './atoms'
import { useAuth } from '@/hooks/useAuth'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  const { getUser } = useAuth()

  useEffect(() => {
    if (currentUser && isAuth) return

    getUser()
      .then((data) => {
        setCurrentUser(data)
        setIsAuth(true)
      })
      .catch(() => setIsAuth(false))
  }, [currentUser, getUser, isAuth])

  if (isAuth === null) {
    return <MainLayout content={<LoaderStub />} />
  }

  return (
    <UserContext.Provider value={{ currentUser, isAuth, setCurrentUser, setIsAuth }}>
      <ErrorBoundary fallback="Error. Check console in dev tools.">
        <RouterProvider router={router} />
      </ErrorBoundary>
    </UserContext.Provider>
  )
}

export default App
