import { Button } from '@/components/atoms'
import { Field } from '@/components/molecules'
import { useAppSelector } from '@/hooks'
import { ForumAPI } from '@/services/forum/ForumService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface FieldValues extends Record<'title' | 'description' | 'author', string> {}

interface SubmitRequestParams {
  author: string
  title: string
  description: string
}

export default function CreateTopicContent() {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.user)
  const { register, handleSubmit } = useForm<FieldValues>({ mode: 'onBlur' })
  const [createPost, {}] = ForumAPI.useCreateTopicMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data: SubmitRequestParams) => {
    console.log({ data })

    const body = {
      ...data,
      author:
        user!.display_name ||
        user!.login ||
        `${user!.first_name || null} ${user!.second_name || null}`,
    }

    try {
      await createPost(body)
    } finally {
      navigate('/forum')
    }
  }

  return (
    <main className="w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col p-[40px] border-2 border-green-300 dark:border-purple-500 rounded-2xl"
      >
        <div>
          <Field label="title" type="text" name="title" register={register} />
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
        <Button type="submit" label="Create" />
      </form>
    </main>
  )
}
