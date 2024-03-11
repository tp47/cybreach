import { CreateIconSVG } from '@/components/atoms/CreateIconSVG'
import { ForumLayout } from '@/components/templates/ForumLayout'
import { Link } from 'react-router-dom'
import { useFetchAllTopicsQuery } from '@/services/api/forumApi'
import { ITopic } from '@/types/forum'
import { ErrorStub, LoaderStub } from '@/components/atoms'
import { TopicPreview } from '../TopicPreview'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export default function Forum() {
  const { data: topics, isLoading, error, isError } = useFetchAllTopicsQuery('')

  return (
    <>
      {isLoading && <LoaderStub inLayout />}
      {!isLoading && (
        <ForumLayout
          header={
            <div className="h-full px-2 flex items-center">
              <Link className="w-9 ml-auto" to="/create-topic">
                <CreateIconSVG className="hover:scale-110" />
              </Link>
            </div>
          }
          content={
            <>
              {isError && (
                <ErrorStub message={`${(error as FetchBaseQueryError)?.data || 'Fetch error'}`} />
              )}
              {topics.length && (
                <ul className="text-white dark:text-black h-full">
                  {topics?.map((topic: ITopic, idx: number) => (
                    <TopicPreview {...topic} key={idx} />
                  ))}
                </ul>
              )}
              {!topics.length && (
                <div className="w-full h-full flex text-center items-center justify-center text-green-300 dark:text-pink-700 text-2xl uppercase">
                  Nobody wrote here yet...
                </div>
              )}
            </>
          }
        />
      )}
    </>
  )
}
