import { useAppSelector } from '@/hooks'
import { LEADERBOARD_DATA } from '@/types/leaderboard'
import { UNSET_AVATAR_PATH, RESOURCES_URL } from '@/constants/avatarsPath'

const styles = {
  main: `
    w-full
    h-full
    text-white
    border-2
    border-green-300
    dark:border-pink-500
    rounded-2xl
    bg-custom-leaderboard-light
    dark:bg-custom-leaderboard-dark
    px-1
    overflow-scroll
  `,
  table_light: `
    h-full
    w-full
    rounded-2xl
    overflow-hidden
    border-separate
    border-spacing-[3px]
  `,
  table_dark: `
    h-full
    w-full
    rounded-2xl
    overflow-hidden
    border-separate
    border-spacing-[3px]
  `,
  head: `
    text-black
    h-[60px]
  `,
  number: `
    w-[100px]
    text-xl
  `,
  player: `
    uppercase
    text-xl
  `,
  image: `
    h-[48px]
    w-[48px]
    border
    border-green-300
    dark:border-pink-500
    rounded-xl
    bg-contain
    bg-center
    bg-no-repeat
  `,
  score: `
    w-[300px]
    uppercase
    text-xl
  `,
  row: `
    h-[60px]
    uppercase
  `,
  td: `
    bg-custom-green-night
    rounded-2xl
    uppercase
    px-[8px]
  `,
  withPicture: `
    flex
    items-center
    justify-start
    h-[60px]
    gap-[16px]
  `,
  center: `
    text-center
  `,
  footer: `
    h-[60px]
    w-full
  `,
}

interface IProps {
  list: LEADERBOARD_DATA | null
}

export default function LeaderBoardContent({ list }: IProps) {
  const darkMode = useAppSelector((state) => state.theme.darkMode)

  return (
    <main className={styles.main}>
      <table className={darkMode ? styles.table_dark : styles.table_light}>
        <thead>
          <tr className={styles.head}>
            <th className={styles.number}>#</th>
            <th className={styles.player}>player</th>
            <th className={styles.score}>TOP score</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item, idx) => (
            <tr className={styles.row} key={idx}>
              <td className={`${styles.td} ${styles.center}`}>{idx + 1}</td>
              <td className={`${styles.td} ${styles.withPicture}`}>
                <img
                  className={styles.image}
                  src={item.data.avatar ? `${RESOURCES_URL}${item.data.avatar}` : UNSET_AVATAR_PATH}
                  alt={`${item.data.playerName}'s avatar`}
                />
                {item.data.playerName}
              </td>
              <td className={`${styles.td} ${styles.center}`}>{item.data.value}</td>
            </tr>
          ))}
          <div className={styles.footer}></div>
        </tbody>
      </table>
    </main>
  )
}
