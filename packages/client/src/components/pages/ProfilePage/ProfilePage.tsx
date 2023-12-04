import { ProfileContent } from '@/components/organisms/ProfileContent'
import { MainLayout } from '@/components/templates'
import { ProfileHeader } from '@/components/organisms/ProfileHeader'

export default function ProfilePage(): JSX.Element {
  return <MainLayout header={<ProfileHeader />} content={<ProfileContent />} />
}
