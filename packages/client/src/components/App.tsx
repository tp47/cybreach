import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { router } from '@/router'

import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { UserAction } from '@/store/user/UserActions'
import { useFullScreen } from '@/hooks/useFullScreen'

import { MainLayout } from './templates'
import { LoaderStub } from './atoms'
import { AuthApi } from '@/services/api'

function App() {
  const [isInit, setIsInit] = useState(false)

  const { isLoading } = useAppSelector((state) => state.user)

  useFullScreen()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      AuthApi.oauthLogin({ code }).then(() => {
        dispatch(UserAction.get())
        setIsInit(true)

        const url = new URL(window.location.href)
        url.searchParams.delete('code')
        window.history.pushState({}, '', url.href)
      })
    } else {
      dispatch(UserAction.get())
      setIsInit(true)
    }
  }, [dispatch])

  if (!isInit || isLoading) {
    return <MainLayout content={<LoaderStub />} />
  }

  return (
    <ErrorBoundary fallback="Error. Check console in dev tools.">
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
