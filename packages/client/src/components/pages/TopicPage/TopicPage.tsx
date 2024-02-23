import { MainLayout } from '../../templates'
import { Header, Topic } from '../../organisms'

export default function TopicPage(): JSX.Element | null {
  return <MainLayout header={<Header title="Topic" />} content={<Topic />} />
}
