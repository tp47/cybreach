import { Button, ErrorLine } from '@/components/atoms'
import { Field } from '@/components/molecules'
import { useAppSelector } from '@/hooks'
import { useCreateTopicMutation } from '@/services/api/forumApi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface SubmitRequestParams {
  author_id: number
  title: string
  description: string
}

interface FieldValues extends Record<keyof SubmitRequestParams, string> {}

export default function CreateTopicForm() {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.user)
  const { register, handleSubmit } = useForm<FieldValues>({ mode: 'onBlur' })
  const [createPost, { error, isError }] = useCreateTopicMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data: SubmitRequestParams) => {
    console.log({ data, user })

    const body = {
      ...data,
      author_id: user?.id,
    }

    try {
      await createPost(body)
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
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col p-[40px] border-2 border-green-300 dark:border-purple-500 rounded-2xl"
      >
        <div>
          <Field label="title" type="text" name="title" register={register} bigLabel />
        </div>
        <div className="h-full flex flex-col mb-[40px]">
          <label
            htmlFor="descriptionTopic"
            className="block text-emerald-400  dark:text-purple-500  text-xl uppercase"
          >
            Description
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
        {isError && <ErrorLine error={error?.data} />}
        <Button type="submit" label="Create" />
      </form>
    </main>
  )
}
