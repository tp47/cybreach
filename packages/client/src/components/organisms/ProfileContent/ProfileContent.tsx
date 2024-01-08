import { ProfileContentInfo } from '../ProfileContentInfo'

import { ProfileContentAvatar } from '../ProfileContentAvatar'
import { UserAction } from '@/store/user/UserActions'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { FullScreen } from '@/components/atoms/FullScreen'

const styles = {
  main: `
    border-2
    border-green-300
    bg-black
    p-20
    w-full
    h-full
    flex
    rounded-2xl
    justify-center
    items-center
  `,
  container: `
    flex
    gap-x-20
    w-[90%]
    justify-between
    mx-auto
  `,
  right: `
    mt-20
    basis-1/2
    h-full
    w-full
  `,
}
export default function ProfileContent(): JSX.Element {
  const { user, authError } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

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

      <FullScreen />
    </main>
  )
}
