import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'

interface IProps {
  Header?: () => JSX.Element
  Content?: () => JSX.Element
  Footer?: () => JSX.Element
}

export default function MainLayout({ Header, Content, Footer }: IProps) {
  return (
    <div className="flex flex-col p-[60px] w-screen h-screen custom-bg-gradiend">
      {Header && (
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      )}
      {Content && (
        <ErrorBoundary>
          <Content />
        </ErrorBoundary>
      )}
      {Footer && (
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      )}
    </div>
  )
}
