import { Avatar, Button } from '@/components/atoms'
import { AddCommentSVG } from '@/components/atoms/AddCommentSVG'
import { getFormatDate } from '@/services/helpers/dateTools'
import { IComment, ITopic } from '@/types/forum'
import { useState } from 'react'

type PostProps = {
  post: ITopic
}

export default function Post({ post }: PostProps): JSX.Element {
  const [isAddComment, setIsAddComment] = useState(false)

  return (
    <div className="flex border-b h-auto border-green-300 dark:border-pink-600 p-2 gap-4 relative ">
      <div className="flex items-start justify-start">
        <Avatar base user={post.author} />
        <div className="flex flex-col ml-2 justify-start align-start items-left">
          <p className="text-left text-sm text-green-300 dark:text-pink-600">
            {post?.author as unknown as string}
          </p>
          <p className="text-xs text-white dark:text-black">{post?.description}</p>
        </div>

        <div className="absolute right-0 top-0 p-1 text-xs text-white dark:text-black">
          {getFormatDate(post?.createdAt)}
        </div>
        {!isAddComment && (
          <button
            onClick={() => setIsAddComment(true)}
            className="fill-none min-w-[18px] max-w-[28px] absolute bottom-1 right-2 cursor-pointer hover:fill-green-300"
          >
            <AddCommentSVG />
          </button>
        )}

        <>
          {isAddComment && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="min-w-full h-full flex flex-col p-[10px] border border-green-300 rounded-2xl"
            >
              <div className="h-full flex flex-col mb-[20px]">
                <div className="h-full">
                  <textarea
                    {...register('comment')}
                    name="comment"
                    className="block w-full h-full p-2 mt-1 bg-gray-800 border border-green-400 text-green-400 rounded-md focus:outline-none focus:ring ring-green-300"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-[20px] w-[50%] mx-auto">
                <Button type="submit" label="Create"></Button>
                <Button onClick={() => setIsAddComment(false)} label="Close"></Button>
              </div>
            </form>
          )}
        </>
      </div>
    </div>
  )
}
