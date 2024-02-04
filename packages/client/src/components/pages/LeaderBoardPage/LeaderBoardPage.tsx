import { Header, LoaderStub, MainLayout } from '@/components'
import { LeaderBoardContent } from '@/components/organisms/LeaderBoardContent'
import LeaderboardApi from '@/services/api/leaderboardApi'
import { LEADERBOARD_DATA } from '@/types/leaderboard'
import { useEffect, useState } from 'react'

function LeaderBoardPage(): JSX.Element {
  const [list, setList] = useState<LEADERBOARD_DATA | null>(null)

  useEffect(() => {
    if (!list) {
      LeaderboardApi.getAll({ cursor: 0, limit: 10 }).then((res) => {
        setList(res)
      })
    }
  }, [list])

  return (
    <MainLayout
      header={<Header title="leaderboard" />}
      content={
        <>
          {!list && <LoaderStub inLayout />}
          {list && <LeaderBoardContent list={list} />}
        </>
      }
    />
  )
}

export default LeaderBoardPage
