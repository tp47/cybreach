import { Avatar, AddCommentSVG } from '@/components'
import { getFormatDate } from '@/services/helpers/dateTools'
import { ITopic } from '@/types'
import { AddCommentForm } from '../AddCommentForm'
import { useCreateCommentMutation } from '@/services/api'
import { useAppSelector } from '@/hooks'
import { useState } from 'react'

type PostProps = {
  post: ITopic
}

export default function Post({ post }: PostProps): JSX.Element {
  const [isAddComment, setIsAddComment] = useState(false)
  const [createComment, { isLoading, error }] = useCreateCommentMutation()
  const { user } = useAppSelector((state) => state.user)

  const handleSubmitComment = async (comment: any) => {
    const data = {
      content: comment.comment,
      author_id: user?.id,
      topic_id: post.id,
    }

    try {
      await createComment(data)
      console.log('submitting comment:', data)
    } finally {
      setIsAddComment(false)
    }
  }

  return (
    <div className="flex flex-col border-b-2 h-auto border-green-300 dark:border-pink-600 p-2 gap-4 relative">
      <div className="flex items-start justify-start">
        <Avatar base user={post.author} />
        <div className="flex flex-col ml-2 justify-start align-start items-left">
          <p className="text-left text-sm text-green-300 dark:text-pink-600">
            {post?.author?.name}
          </p>
          <p className="text-xs text-white dark:text-black">{post?.description}</p>
        </div>

        <div className="absolute right-0 top-0 p-1 text-xs text-white dark:text-black">
          {getFormatDate(post?.createdAt)}
        </div>
        {!isAddComment && (
          <button
            onClick={() => setIsAddComment(true)}
            className="fill-none w-6 absolute bottom-1 right-2 cursor-pointer hover:fill-green-300"
          >
            <AddCommentSVG />
          </button>
        )}
      </div>
      <>
        {isAddComment && (
          <AddCommentForm
            postId={post.id}
            onSubmitComment={handleSubmitComment}
            onCloseForm={() => setIsAddComment(false)}
          />
        )}
      </>
    </div>
  )
}
