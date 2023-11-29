import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { router } from '@/router'
import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { UserAction } from '@/store/user/UserActions'

function App() {
  const [isInit, setIsInit] = useState(false)

  const { isLoading } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(UserAction.get())
    setIsInit(true)
  }, [dispatch])

  if (!isInit || isLoading) {
    return <div>Loading</div>
  }

  return (
    <ErrorBoundary fallback="Error. Check console in dev tools.">
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
