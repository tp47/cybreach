import { MainHeader, MainLayout, MainContent } from '@/components'
import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { useState } from 'react'

export default function MainPage(): JSX.Element {
  const [showTutorial, setShowTutorial] = useState(false)

  const toggleTutorial = () => setShowTutorial((prev) => !prev)

  return (
    <ErrorBoundary fallback="Ошибка в MainPage">
      <MainLayout
        header={<MainHeader showTutorial={showTutorial} />}
        content={<MainContent showTutorial={showTutorial} toggleTutorial={toggleTutorial} />}
      />
    </ErrorBoundary>
  )
}
