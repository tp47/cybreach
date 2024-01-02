import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { routes } from '@/routes'

import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { UserAction } from '@/store/user/UserActions'
import { useFullScreen } from '@/hooks/useFullScreen'

import { MainLayout } from './templates'
import { LoaderStub } from './atoms'

function App() {
  const [isInit, setIsInit] = useState(false)

  const { isLoading } = useAppSelector((state) => state.user)

  useFullScreen()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(UserAction.get())
    setIsInit(true)
  }, [dispatch])

  if (!isInit || isLoading) {
    return <MainLayout content={<LoaderStub />} />
  }

  return (
    <ErrorBoundary fallback="Error. Check console in dev tools.">
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}
      </Routes>
    </ErrorBoundary>
  )
}

export default App
