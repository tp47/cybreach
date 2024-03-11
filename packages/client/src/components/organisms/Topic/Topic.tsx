import { useParams } from 'react-router-dom'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ForumLayout, Post, Comment, ErrorStub, LoaderStub } from '@/components'
import { useFetchTopicQuery } from '@/services/api'
import { IComment } from '@/types'

export default function Topic() {
  const { id } = useParams()
  const { data, isLoading, error } = useFetchTopicQuery(id)

  return (
    <ForumLayout
      header={
        <div className="h-full text-xl font-bold flex items-center px-[20px]">
          {data?.post?.title}
        </div>
      }
      content={
        <>
          {isLoading && <LoaderStub inLayout />}
          {error && (
            <ErrorStub message={`${(error as FetchBaseQueryError)?.data || 'Fetch error'}`} />
          )}
          {data?.post && <Post post={data?.post} />}
          {data?.comments?.length && (
            <ul>
              {data?.comments.map((comment: IComment, idx: number) => (
                <Comment comment={comment} key={idx} />
              ))}
            </ul>
          )}
        </>
      }
    />
  )
}
