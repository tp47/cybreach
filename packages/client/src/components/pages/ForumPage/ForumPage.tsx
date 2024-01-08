import { ForumContent, Header, MainLayout } from '@/components'

export default function ForumPage() {
  return <MainLayout header={<Header title="forum" />} content={<ForumContent />} />
}
