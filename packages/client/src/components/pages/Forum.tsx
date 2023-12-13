import { InDevelopmentStub, Header, MainLayout } from '@/components'

export function Forum(): JSX.Element {
  return <MainLayout header={<Header title="forum" />} content={<InDevelopmentStub />} />
}
