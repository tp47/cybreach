import { ErrorBoundary } from '@/services/helpers/ErrorBoundary'
import { ReactNode } from 'react'

interface IProps {
  header?: ReactNode
  content?: ReactNode
  footer?: ReactNode
}

export default function ForumContentLayout({ header, content, footer }: IProps) {
  return (
    <div className="h-full w-full flex flex-col justify-between">
      <ErrorBoundary>
        <div className="bg-green-300 dark:bg-purple-400 h-[60px] rounded-t-2xl">
          {header ? header : null}
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="h-full border-r border-l border-green-300 dark:border-pink-500">
          {content ? content : null}
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="bg-green-300 dark:bg-purple-400 h-[60px] rounded-b-2xl">
          {footer ? footer : null}
        </div>
      </ErrorBoundary>
    </div>
  )
}
