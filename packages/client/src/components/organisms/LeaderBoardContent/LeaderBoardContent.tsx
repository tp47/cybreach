const styles = {
  main: `
    w-full
    h-full
    text-white
  `,
  table: `
    w-full
    rounded-2xl
    overflow-hidden
    bg-green-300
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

export default function LeaderBoardContent() {
  return (
    <main className={styles.main}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.head}>
            <th className={styles.number}>#</th>
            <th>player</th>
            <th className={styles.score}>TOP score</th>
          </tr>
        </thead>
        <tbody>
          {LEADERS.map((item, idx) => (
            <tr className={styles.row} key={idx}>
              <td className={`${styles.td} ${styles.center}`}>{idx + 1}</td>
              <td className={styles.td}>{item.playerName}</td>
              <td className={`${styles.td} ${styles.center}`}>{item.value}</td>
            </tr>
          ))}
          <div className={styles.footer}></div>
        </tbody>
      </table>
    </main>
  )
}
