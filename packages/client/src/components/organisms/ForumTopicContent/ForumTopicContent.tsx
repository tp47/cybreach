import { AddCommentSVG } from '@/components/atoms/AddCommentSVG'
import { ForumContentLayout } from '@/components/templates/ForumContentLayout'
import { getFormatDate } from '@/services/helpers/dateTools'
import { useParams } from 'react-router-dom'
import { TOPICS } from '../ForumContent/ForumContent'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/atoms'

interface FieldValues extends Record<'comment', string> {}

const comments = [
  {
    id: 1,
    author: {
      name: 'Ivan',
    },
    created_at: 1704535740676,
    text: 'my old comment there',
  },
  {
    id: 2,
    author: {
      name: 'Petr',
    },
    created_at: 1704535740676,
    text: 'my new comment there',
  },
]

export default function ForumTopicContent() {
  let { id } = useParams()

  const [isAddComment, setIsAddComment] = useState(false)

  const { register, handleSubmit } = useForm<FieldValues>({ mode: 'onBlur' })

  const topic = TOPICS.find((item) => item.id === Number(id))

  if (!topic) return null

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <ForumContentLayout
      header={
        <div className="h-full text-[24px] font-bold flex items-center px-[20px]">
          {topic.title}
        </div>
      }
      content={
        <div className="text-green-300">
          <div className="flex border-b border-green-300 p-[10px] gap-[20px] relative flex-wrap">
            <div className="flex">
              <div className="text-center min-w-[200px]">{topic.author.name}</div>
              <div className="font-light py-[25px]">{topic.description}</div>
              <div className="absolute right-0 top-0 rounded-bl-2xl border border-green-300 p-[4px]">
                {getFormatDate(topic.create_at)}
              </div>
              {!isAddComment && (
                <div
                  onClick={() => setIsAddComment(true)}
                  className="fill-none min-w-[18px] max-w-[28px] absolute bottom-[5px] right-[10px] cursor-pointer hover:fill-green-300"
                >
                  <AddCommentSVG />
                </div>
              )}
            </div>
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
          </div>
          {comments?.length && (
            <ul>
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className=" bg-gray-800 p-[10px] font-light border border-gray-950"
                >
                  <div className="flex">
                    <div>{comment.author.name}</div>
                    <div className="ml-auto text-[12px]">{getFormatDate(comment.created_at)}</div>
                  </div>
                  <div className="italic px-[10px]">{comment.text}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      }
    />
  )
}
