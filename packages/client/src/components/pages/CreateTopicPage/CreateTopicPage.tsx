import { CreateTopicForm, Header, MainLayout } from '@/components'

export default function CreateTopicPage() {
  return <MainLayout header={<Header title="create topic" />} content={<CreateTopicForm />} />
}
