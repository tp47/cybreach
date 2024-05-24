import { Button, ErrorLine } from '@/components/atoms'
import { Field } from '@/components/molecules'
import { useAppSelector } from '@/hooks'
import { useEditTopicMutation, useFetchTopicQuery } from '@/services/api/forumApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

interface SubmitRequestParams {
  topicId: number
  title: string
  description: string
}

interface FieldValues extends Record<keyof SubmitRequestParams, string | number> {}

export default function EditTopicForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [editTopic, { isError, error }] = useEditTopicMutation()
  const { register, handleSubmit, reset } = useForm<FieldValues>({ mode: 'onBlur' })
  const { data } = useFetchTopicQuery(id)

  useEffect(() => {
    if (data) {
      const { title, description } = data.post
      reset({
        title: title || '',
        description: description || '',
      })
    }
  }, [data, reset])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await editTopic({
        topicId: id,
        title: data.title,
        description: data.description,
      })
    } catch (e) {
      console.log({ e })
    } finally {
      if (!isError) {
        navigate('/forum')
      }
    }
  }

  return (
    <main className="w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        className="w-full h-full flex flex-col p-[40px] border-2 border-green-300 dark:border-purple-500 rounded-2xl"
      >
        <div>
          <Field label="new title" type="text" register={register} name="title" bigLabel />
        </div>
        <div className="h-full flex flex-col mb-[40px]">
          <label
            htmlFor="descriptionTopic"
            className="block text-emerald-400  dark:text-purple-500  text-xl uppercase"
          >
            new description
          </label>
          <div className="h-full">
            <textarea
              {...register('description')}
              id="descriptionTopic"
              name="description"
              className="block w-full h-full p-2 mt-1 bg-gray-800 border border-green-400 text-green-400  dark:border-purple-500  dark:text-pink-500 rounded-md focus:outline-none focus:ring ring-green-300 dark:ring-pink-600"
            ></textarea>
          </div>
        </div>
        {isError && <ErrorLine error={(error as FetchBaseQueryError)?.data} />}
        <Button type="submit" label="submit" />
      </form>
    </main>
  )
}
