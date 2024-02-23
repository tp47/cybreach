import '@/index.css'

import { Routes, Route } from 'react-router-dom'
import { routes } from '@/routes'
import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { MainLayout } from '@/components'
import { LoaderStub } from '@/components'
import { useEffect, useState } from 'react'
import { useFullScreen } from '@/hooks/useFullScreen'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { UserAction } from '@/store/user/UserActions'

import { AuthApi } from '@/services/api'
import { useCreateAuthorMutation } from '@/services/api/forumApi'

function App() {
  const [isInit, setIsInit] = useState(false)
  const { user, isLoading } = useAppSelector((state) => state.user)
  const [createAuthor, {}] = useCreateAuthorMutation()

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

  useEffect(() => {
    if (user) {
      const forumUser = {
        id: user?.id,
        name: user?.display_name || user?.login || user?.email,
        avatar: user?.avatar,
      }
      createAuthor(forumUser)
    }
  }, [user])

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
