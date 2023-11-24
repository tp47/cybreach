import { Button } from '@/components/atoms'
import { MainLayout } from '@/components/templates'
import { UserContext } from '@/services/context'
import { AuthApi } from '@/services/api'
import { useState, useContext } from 'react'

export function Profile() {
  const { currentUser, setCurrentUser, setIsAuth } = useContext(UserContext)
  const [error, setError] = useState<Error | null>(null)

  const onLogout = () => {
    AuthApi.logoutUser()
      .then(() => {
        setCurrentUser(null)
        setIsAuth(false)
      })
      .catch((e) => {
        setError(e)
      })
  }

  return (
    <MainLayout
      content={
        <div className="flex justify-center align-center flex-col items-center h-full w-52 mx-auto">
          <div className="flex justify-center items-center">
            <div className="text-base text-green-300 text-center mx-auto mb-10">
              {JSON.stringify(currentUser, null, 2)}
            </div>
          </div>
          {error && (
            <span className="text-red-500 text-sm w-full text-center">{error.message}</span>
          )}
          <Button label="logout" onClick={onLogout} />
        </div>
      }
    />
  )
}
