import { Button } from '@/components/atoms'
import { MainLayout } from '@/components/templates'
import { UserContext } from '@/services/context'
import { AuthApi } from '@/services/api'
import { useState, useContext } from 'react'

import { useNavigate } from 'react-router-dom'

export function Profile() {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [error, setError] = useState<Error | null>(null)

  const onLogout = () => {
    AuthApi.logoutUser()
      .then(() => setCurrentUser(null))
      .then(() => navigate('/signin'))
      .catch((e) => {
        setError(e)
      })
  }

  return (
    <MainLayout
      content={
        <div className="flex justify-center align-center flex-col items-center h-[100%]">
          <div className="container justify-center items-center">
            <div className="text-base text-white text-center w-52 mx-auto">
              {JSON.stringify(currentUser, null, 2)}
            </div>
          </div>
          {error && (
            <span className="text-red-500 text-sm w-full text-center">{error.message}</span>
          )}
          <Button
            label="logout"
            className="
                bg-green-950
                border-2
                border-green-300
                uppercase
                rounded-lg
                py-[12px] px-[15px]
                w-[471px]
                mt-10
                shadow-[0px_0px_4px_1px]
                shadow-green-300
                text-white
                hover:bg-green-300
                hover:text-green-950
                disabled:bg-stone-500
                disabled:text-stone-400
                disabled:shadow-none
                disabled:border-stone-500
                active:bg-emerald-600
                active:text-green-300
                transition-all
                duration-750
              "
            onClick={onLogout}
          />
        </div>
      }
    />
  )
}
