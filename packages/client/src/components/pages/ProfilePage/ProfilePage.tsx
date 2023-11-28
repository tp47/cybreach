import { ProfileContent } from '@/components/organisms/ProfileContent'
import { MainLayout } from '@/components/templates'

export default function ProfilePage(): JSX.Element {
  return <MainLayout content={<ProfileContent />} />
}
