import { ProfileContent, Header } from '@/components'
import { MainLayout } from '@/components/templates'

export default function ProfilePage(): JSX.Element {
  return <MainLayout header={<Header title="profile" />} content={<ProfileContent />} />
}
