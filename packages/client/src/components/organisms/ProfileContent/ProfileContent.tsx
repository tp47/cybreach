import { ProfileContentInfo } from '../ProfileContentInfo'

import { UserContext } from '@/services/context'
import { AuthApi } from '@/services/api'
import { useState, useContext } from 'react'
import { ProfileContentAvatar } from '../ProfileContentAvatar'

const styles = {
  main: `
    border-2
    border-green-300
    bg-black
    p-20
  `,
  container: `
    max-w-screen-xl
    flex
    gap-x-20
    w-[100%]
    justify-between
    mx-auto
  `,
  right: `
    mt-20
    basis-1/2
  `,
}
export default function ProfileContent(): JSX.Element {
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
    <main className={styles.main}>
      <div className={styles.container}>
        <section>
          <ProfileContentAvatar user={currentUser} />
        </section>
        <section className={styles.right}>
          <ProfileContentInfo onLogout={onLogout} user={currentUser} />

          {error && (
            <span className="text-red-500 text-sm w-full text-center">{error.message}</span>
          )}
        </section>
      </div>
    </main>
  )
}
