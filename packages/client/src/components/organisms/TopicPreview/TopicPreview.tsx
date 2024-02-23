import { IAuthor, ITopic } from '@/types/forum'
import { Link } from 'react-router-dom'
import { getFormatDate } from '@/services/helpers/dateTools'
import { Avatar, CommentSVG, EyeSVG } from '@/components'

export default function TopicPreview(topic: ITopic): JSX.Element {
  return (
    <li className="relative border-b border-green-300 dark:border-pink-500 p-4 hover:bg-green-950 dark:hover:bg-purple-700">
      <Link key={topic.id} to={`${topic.id}`}>
        <div className="mb-[10px] text-xl text-green-300 dark:text-pink-600">{topic.title}</div>
        <div className="flex w-auto justify-start items-center gap-3">
          <Avatar user={topic.author as IAuthor} sm />
          <div className="text-base ">{topic?.author?.name}</div>
        </div>
        <div className="absolute right-4 top-4 text-base text-green-300 dark:text-pink-700">
          {getFormatDate(topic.createdAt)}
        </div>
        <div className="flex gap-2 items-center cursor-pointer absolute right-4 bottom-4">
          <EyeSVG className="fill-green-300 dark:fill-pink-700 w-5" />
          {topic.count_views}
          <CommentSVG className="w-5" />
          {topic.comments_count}
        </div>
      </Link>
    </li>
  )
}
