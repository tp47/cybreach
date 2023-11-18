import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { ReactNode } from 'react'

interface IProps {
  header?: ReactNode
  content?: ReactNode
  footer?: ReactNode
}

export default function MainLayout({ header, content, footer }: IProps) {
  return (
    <div className="flex flex-col p-[60px] w-screen h-screen bg-custom-layout">
      {header && <ErrorBoundary>{header}</ErrorBoundary>}
      {content && <ErrorBoundary>{content}</ErrorBoundary>}
      {footer && <ErrorBoundary>{footer}</ErrorBoundary>}
    </div>
  )
}
