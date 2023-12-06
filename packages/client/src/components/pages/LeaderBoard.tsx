import { InDevelopmentStub, Header, MainLayout } from '@/components'

export function LeaderBoard(): JSX.Element {
  return <MainLayout header={<Header title="leaderboard" />} content={<InDevelopmentStub />} />
}
