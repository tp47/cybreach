import { MainLayout } from '../../templates'
import { Header, TopicPageContent } from '../../organisms'

export default function TopicPage(): JSX.Element | null {
  return <MainLayout header={<Header title="Topic" />} content={<TopicPageContent />} />
}
