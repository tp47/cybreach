import { useAppSelector } from '@/hooks'
import { LEADERBOARD_DATA } from '@/types/leaderboard'

const styles = {
  main: `
    w-full
    h-full
    text-white
  `,
  table_light: `
    w-full
    rounded-2xl
    overflow-hidden
    bg-green-300
    border-separate
    border-spacing-[2px]
  `,
  table_dark: `
    w-full
    rounded-2xl
    overflow-hidden
    bg-purple-400
    border-separate
    border-spacing-[2px]
  `,
  head: `
    text-black
    h-[60px]
  `,
  number: `
    w-[100px]
  `,
  score: `
    w-[300px]
  `,
  row: `
    h-[60px]
  `,
  td: `
    bg-custom-green-night
    rounded-2xl
    p-[15px]
  `,
  center: `
    text-center
  `,
  footer: `
    h-[60px]
    w-full
  `,
}

const LEADERS = [
  {
    playerName: 'Pavel Durov',
    value: 30,
  },
  {
    playerName: 'Pavel Durov',
    value: 30,
  },
  {
    playerName: 'Pavel Durov',
    value: 30,
  },
  {
    playerName: 'Pavel Durov',
    value: 30,
  },
  {
    playerName: 'Pavel Durov',
    value: 30,
  },
  {
    playerName: 'Pavel Durov',
    value: 30,
  },
  {
    playerName: 'Pavel Durov',
    value: 30,
  },
  {
    playerName: 'Pavel Durov',
    value: 30,
  },
]

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
            <th>player</th>
            <th className={styles.score}>TOP score</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item, idx) => (
            <tr className={styles.row} key={idx}>
              <td className={`${styles.td} ${styles.center}`}>{idx + 1}</td>
              <td className={styles.td}>{item.data.playerName}</td>
              <td className={`${styles.td} ${styles.center}`}>{item.data.value}</td>
            </tr>
          ))}
          <div className={styles.footer}></div>
        </tbody>
      </table>
    </main>
  )
}
