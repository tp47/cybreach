import { Forum, Header, MainLayout } from '@/components'

export default function ForumPage() {
  return <MainLayout header={<Header title="forum" />} content={<Forum />} />
}
