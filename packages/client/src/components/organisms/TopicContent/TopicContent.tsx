import { ForumContentLayout } from '@/components/templates/ForumContentLayout'
import { useParams } from 'react-router-dom'
import { ErrorStub, LoaderStub } from '@/components/atoms'
import { Post, Comment } from '@/components'
import { IComment } from '@/types/forum'
import { ForumAPI } from '@/services/forum/ForumService'

export default function TopicContent() {
  const { id } = useParams()

  const { data, isLoading, error } = ForumAPI.useFetchTopicQuery(id)

  return (
    <ForumContentLayout
      header={
        <div className="h-full text-[24px] font-bold flex items-center px-[20px]">
          {data?.topic?.title}
        </div>
      }
      content={
        <>
          {isLoading && <LoaderStub inLayout />}
          {error && <ErrorStub message="Fetch error" />}
          {data?.topic && <Post post={data.topic} />}
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
