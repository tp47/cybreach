import { ProfileContentInfo } from '../ProfileContentInfo'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { UserAction } from '@/store/user/UserActions'

const styles = {
  main: `
    h-full
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
  name: `
    text-5xl
    text-white
    uppercase
    font-normal
  `,
  image: `
    bg-profile
    h-[260px]
    w-[438px]
    mt-10
  `,
  icons: `
    flex
    w-[100%]
    justify-center
    gap-3
  `,
  icon: `
    h-[28px]
    w-[28px]
    bg-no-repeat
    bg-cover
  `,
  imageBox: `
    w-[438px]
  `,
}
export default function ProfileContent(): JSX.Element {
  const { user, error } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(UserAction.logout())
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section>
          <div className={styles.name}>{user?.display_name}</div>

          <div className={styles.imageBox}>
            <div className={styles.image} />
            <div className={styles.icons}>
              <div className={`${styles.icon} bg-like`} />
              <div className={`${styles.icon} bg-romb`} />
              <div className={`${styles.icon} bg-battery`} />
            </div>
          </div>
        </section>
        <section className={styles.right}>
          <ProfileContentInfo onLogout={onLogout} user={user} />

          {error && <span className="text-red-500 text-sm w-full text-center">{error}</span>}
        </section>
      </div>
    </main>
  )
}
