import { useNavigate, useParams } from 'react-router-dom'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import {
  ForumLayout,
  Post,
  Comment,
  ErrorStub,
  LoaderStub,
  EditBar,
  Modal,
  Button,
} from '@/components'
import { useFetchTopicQuery } from '@/services/api'
import { IComment } from '@/types'
import { useAppSelector } from '@/hooks'
import { useState } from 'react'

export default function Topic() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading, error } = useFetchTopicQuery(id)
  const { user } = useAppSelector((state) => state.user)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const isOwnTopic = data?.post?.author?.id === user?.id

  function onSubmitDeletion() {
    console.warn('deleted')
  }

  function onClose() {
    setIsOpenModal(false)
  }

  return (
    <ForumLayout
      header={
        <div className="h-full text-xl font-bold flex items-center pl-4 pr-2 justify-between">
          {data?.post?.title}
          {isOwnTopic && (
            <EditBar
              onEdit={() => navigate(`/edit-topic/${id}`)}
              onDelete={() => setIsOpenModal(true)}
            />
          )}
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
          <Modal
            isOpen={isOpenModal}
            title="confirm action"
            handleModal={onSubmitDeletion}
            handleClose={onClose}
          >
            <div className="flex flex-col w-full h-full gap-2">
              <p className="w-full text-center my-4">
                Are you sure want to delete this topic? After this, all conversation will lost and
                can not be restored.
              </p>
              <Button label="delete" customClass="h-10 py-[6px]" />
              <Button
                label="cancel"
                customClass="h-10 py-[6px] bg-transparent border-none shadow-transparent text-green-200"
              />
            </div>
          </Modal>
        </>
      }
    />
  )
}
