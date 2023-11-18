import { MainHeader, MainLayout, MainContent } from '@/components'
import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'

export default function MainPage(): JSX.Element {
  return (
    <ErrorBoundary fallback="Ошибка в MainPage">
      <MainLayout header={<MainHeader />} content={<MainContent />} />
    </ErrorBoundary>
  )
}
