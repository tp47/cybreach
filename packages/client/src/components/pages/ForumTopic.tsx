import { MainLayout } from '../templates'
import { Header } from '../organisms'
import { ForumTopicContent } from '../organisms/ForumTopicContent'

export function ForumTopic(): JSX.Element | null {
  return <MainLayout header={<Header title="Topic" />} content={<ForumTopicContent />} />
}
