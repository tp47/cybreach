import { CommentSVG } from '@/components/atoms/CommentSVG'
import { CreateIconSVG } from '@/components/atoms/CreateIconSVG'
import { ForumContentLayout } from '@/components/templates/ForumContentLayout'
import { getFormatDate } from '@/services/helpers/dateTools'
import { Link } from 'react-router-dom'
import { ForumAPI } from '@/services/forum/ForumService'
import { ITopic } from '@/types/forum'
import { LoaderStub } from '@/components/atoms'

export const TOPICS = [
  {
    id: 1,
    title: 'Topic name',
    create_at: 1704535740676,
    comments_count: 20,
    description:
      'Здравствуйте, если вы столкнулись с какими-то проблемами при установке или запуске Cyberpunk 2077, возможно вам помогут следующие действие/действия:Во первых, ознакомьтесь с официальными системными требованиями. Если ваша система не соответствует даже минимальным из них, то возможно причина ошибок кроется в этом. Windows 8 и 8.1 не поддерживается, т. к. для игры необходим DirectX 12, который не поддерживается на этой ОС. Помимо этого, если у вас Windows 10 то версия должна быть не ниже 1909 (подробнее дальше). Так же игру невозможно будет запустить на старых процессорах не поддерживающих AVX и SSE4.2 (решение дальше). Для установки обновлений у вас должно быть достаточно свободного места на жёстком диске, не меньше 60GB. Если все перечисленные требования соблюдены, но ошибки всё равно возникают переходите к шагам дальше.',
    author: {
      name: 'Author Name',
    },
  },
  {
    id: 2,
    title: 'Topic name',
    create_at: 1704535740676,
    comments_count: 20,
    author: {
      name: 'Author Name',
    },
  },
  {
    id: 3,
    title: 'Topic name',
    create_at: 1704535740676,
    comments_count: 20,
    author: {
      name: 'Author Name',
    },
  },
]

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
                <CreateIconSVG />
              </Link>
            </div>
          }
          content={
            <>
              {error && (
                <div className="flex w-full h-full gap-2 text-red-600 text-4xl justify-center mx-auto items-center uppercase">
                  <p>Fetch error</p>
                </div>
              )}
              <ul className="text-white dark:text-black">
                {topics?.map((topic: ITopic) => (
                  <Link key={topic.id} to={`${topic.id}`}>
                    <li className="border-b border-green-300 dark:border-pink-500 p-[10px] hover:bg-green-950 dark:hover:bg-purple-700">
                      <div className="mb-[10px] text-[18px]">{topic.title}</div>
                      <div className="flex justify-between text-green-300 dark:text-purple-800 text-[12px]">
                        <div className="text-base">{topic.author as unknown as string}</div>
                        <div className="flex gap-[10px] items-center">
                          <div className="flex gap-[5px] items-center cursor-pointer">
                            {topic.comments_count}
                            <CommentSVG className="w-[20px]" />
                          </div>
                          <div>{getFormatDate(topic.created_at)}</div>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </>
          }
        />
      )}
    </>
  )
}
