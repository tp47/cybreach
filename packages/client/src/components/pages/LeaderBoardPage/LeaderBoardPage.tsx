import { Header, MainLayout } from '@/components'
import { LeaderBoardContent } from '@/components/organisms/LeaderBoardContent'

function LeaderBoardPage(): JSX.Element {
  return <MainLayout header={<Header title="leaderboard" />} content={<LeaderBoardContent />} />
}

export default LeaderBoardPage
