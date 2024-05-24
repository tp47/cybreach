import { Header, Topic, MainLayout } from '@/components'

export default function TopicPage(): JSX.Element | null {
  return <MainLayout header={<Header title="Topic" />} content={<Topic />} />
}
