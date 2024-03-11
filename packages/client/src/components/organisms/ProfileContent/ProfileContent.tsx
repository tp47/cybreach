import { ProfileContentInfo } from '../ProfileContentInfo'

import { ProfileContentAvatar } from '../ProfileContentAvatar'
import { UserAction } from '@/store/user/UserActions'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useEffect } from 'react'

const styles = {
  main: `
    w-full
    h-full
    border-2
    border-green-300
    dark:border-pink-500
    bg-custom-profile-light
    dark:bg-custom-profile-dark
    p-20
    flex
    rounded-2xl
    justify-center
    items-center
  `,
  container: `
    flex
    gap-x-16
    w-[90%]
    justify-between
    mx-auto
  `,
  right: `
    flex
    flex-col
    justify-between
    mt-20
    basis-1/2
    w-full
  `,
}
export default function ProfileContent(): JSX.Element {
  const { user, authError } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    !user && dispatch(UserAction.get())
  }, [])

  const onLogout = () => {
    dispatch(UserAction.logout())
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section>
          <ProfileContentAvatar user={user} />
        </section>
        <section className={styles.right}>
          <ProfileContentInfo onLogout={onLogout} user={user} />

          {authError && (
            <span className="text-red-500 text-sm w-full text-center">{authError}</span>
          )}
        </section>
      </div>
    </main>
  )
}
