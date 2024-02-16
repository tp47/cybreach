import { MainLayout } from '../../templates'
import { Header, TopicContent } from '../../organisms'

export default function TopicPage(): JSX.Element | null {
  return <MainLayout header={<Header title="Topic" />} content={<TopicContent />} />
}
