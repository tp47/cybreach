import { ProfileContentInfo } from '../ProfileContentInfo'

import { ProfileContentAvatar } from '../ProfileContentAvatar'
import { UserAction } from '@/store/user/UserActions'
import { useAppDispatch, useAppSelector } from '@/hooks'

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
    </main>
  )
}
