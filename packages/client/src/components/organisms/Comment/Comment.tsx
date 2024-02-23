import { Avatar } from '@/components/atoms'
import { AddCommentSVG } from '@/components/atoms/AddCommentSVG'
import { getFormatDate } from '@/services/helpers/dateTools'
import { IComment } from '@/types/forum'
import { AddCommentForm } from '../AddCommentForm'
import { useAppSelector } from '@/hooks'
import { ForumAPI } from '@/services/api/forumApi'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

type CommentProps = {
  comment: IComment
}

export default function Comment({ comment }: CommentProps) {
  const [isAddComment, setIsAddComment] = useState(false)
  const [createComment, { isLoading, error }] = ForumAPI.useCreateCommentMutation()
  const { user } = useAppSelector((state) => state.user)
  const { id } = useParams()

  const handleSubmitComment = async (text: any) => {
    const data = {
      topic_id: id,
      author_id: user?.id,
      parent_comment_id: comment.id,
      content: text.comment,
    }
    try {
      await createComment(data)
      console.log('submitting comment:', data, comment)
    } finally {
      setIsAddComment(false)
    }
  }

  return (
    <li className="flex flex-col border-b-2 border-l-4 border rounded-md rounded-t-none h-auto border-green-300 dark:border-pink-600 p-2 gap-2 my-0 pr-1 relative">
      <div className="flex items-start justify-start">
        <Avatar base user={comment.author} />
        <div className="flex flex-col ml-2 justify-start align-start items-left">
          <p className="text-left text-sm text-green-300 dark:text-pink-600">
            {comment?.author?.name}
          </p>
          <p className="text-xs text-white dark:text-black">{comment?.content}</p>
        </div>

        <div className="absolute right-0 top-0 p-1 text-xs text-white dark:text-black">
          {getFormatDate(comment?.createdAt)}
        </div>
        {}
        {!isAddComment && (
          <button
            onClick={() => setIsAddComment(true)}
            className="fill-none w-5 absolute top-8 right-2 cursor-pointer hover:fill-green-300"
          >
            <AddCommentSVG />
          </button>
        )}
      </div>
      <>
        {isAddComment && (
          <AddCommentForm
            parentCommentId={comment.id}
            onSubmitComment={handleSubmitComment}
            onCloseForm={() => setIsAddComment(false)}
          />
        )}
        {comment?.child_comments?.length !== 0 &&
          comment.child_comments.map((child_comment, idx) => (
            <Comment comment={child_comment} key={idx} />
          ))}
      </>
    </li>
  )
}
