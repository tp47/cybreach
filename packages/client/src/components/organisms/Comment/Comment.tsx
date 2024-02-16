import { getFormatDate } from '@/services/helpers/dateTools'
import { IComment } from '@/types/forum'

type CommentProps = {
  comment: IComment
}

export default function Comment({ comment }: CommentProps) {
  return (
    <li key={comment.id} className=" bg-gray-800 p-[10px] font-light border border-gray-950">
      <div className="flex">
        <div>{comment.author?.name}</div>
        <div className="ml-auto text-[12px]">{getFormatDate(comment.createdAt)}</div>
      </div>
      <div className="italic px-[10px]">{comment?.text}</div>
    </li>
  )
}
