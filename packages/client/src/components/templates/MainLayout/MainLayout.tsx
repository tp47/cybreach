import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { ReactNode } from 'react'

interface IProps {
  header?: ReactNode
  content?: ReactNode
  footer?: ReactNode
}

export default function MainLayout({ header, content, footer }: IProps) {
  return (
    <div className="flex flex-col px-12 pb-8 w-screen h-screen bg-custom-layout justify-center items-center">
      {header && <ErrorBoundary>{header}</ErrorBoundary>}
      {content && <ErrorBoundary>{content}</ErrorBoundary>}
      {footer && <ErrorBoundary>{footer}</ErrorBoundary>}
    </div>
  )
}
