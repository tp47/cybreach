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
      <div className="bg-green-300 dark:bg-pink-600 h-[60px] rounded-t-2xl">
        {header ? header : null}
      </div>

      <div className="h-full w-full border-r border-2 border-green-300 dark:border-pink-600">
        {content && content}
        {!content && '...'}
      </div>

      <div className="bg-green-300 dark:bg-pink-600 h-[60px] rounded-b-2xl">
        {footer ? footer : null}
      </div>
    </div>
  )
}
