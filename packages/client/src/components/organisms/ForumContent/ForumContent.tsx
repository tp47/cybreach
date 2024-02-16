import { CreateIconSVG } from '@/components/atoms/CreateIconSVG'
import { ForumContentLayout } from '@/components/templates/ForumContentLayout'
import { Link } from 'react-router-dom'
import { ForumAPI } from '@/services/forum/ForumService'
import { ITopic } from '@/types/forum'
import { ErrorStub, LoaderStub } from '@/components/atoms'
import { TopicPreview } from '../TopicPreview'

export default function ForumContent() {
  const { data: topics, isLoading, error } = ForumAPI.useFetchAllTopicsQuery('')

  return (
    <>
      {isLoading && <LoaderStub inLayout />}
      {!isLoading && (
        <ForumContentLayout
          header={
            <div className="h-full px-[10px] flex items-center">
              <Link className="w-[35px] ml-auto" to="/create-topic">
                <CreateIconSVG className="hover:scale-110" />
              </Link>
            </div>
          }
          content={
            <>
              {error && <ErrorStub message="fetch error" />}
              <ul className="text-white dark:text-black h-full">
                {topics &&
                  topics?.map((topic: ITopic, idx: number) => (
                    <TopicPreview {...topic} key={idx} />
                  ))}
                {!topics && (
                  <div className="w-full h-full flex text-center items-center justify-center text-green-300 dark:text-pink-700 text-2xl uppercase">
                    Здесь ещё никто не писал...
                  </div>
                )}
              </ul>
            </>
          }
        />
      )}
    </>
  )
}
