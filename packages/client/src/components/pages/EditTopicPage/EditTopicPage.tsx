import { EditTopicForm, Header, MainLayout } from '@/components'

export default function EditTopicPage() {
  return <MainLayout header={<Header title="edit topic" />} content={<EditTopicForm />} />
}
