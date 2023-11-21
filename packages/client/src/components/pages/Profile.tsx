import { Button } from '@/components/atoms'
import { MainLayout } from '@/components/templates'
import { AuthApi } from '@/services/api'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export function Profile() {
  const navigate = useNavigate()
  const [error, setError] = useState<Error | null>(null)

  const onLogout = () => {
    AuthApi.logoutUser()
      .then(() => navigate('/signin'))
      .catch((e) => {
        setError(e)
      })
  }

  return (
    <MainLayout
      content={
        <div className="flex justify-center align-center flex-col items-center h-[100%]">
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
