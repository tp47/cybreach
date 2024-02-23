import { Button } from '@/components'
import { useForm } from 'react-hook-form'

interface Props {
  postId?: number
  parentCommentId?: number
  onSubmitComment: (parameter: any) => void
  onCloseForm: () => void
}

function AddCommentForm({ onSubmitComment, onCloseForm, postId, parentCommentId }: Props) {
  const { handleSubmit, register } = useForm()

  const data = {}

  return (
    <form
      onSubmit={handleSubmit(onSubmitComment)}
      className="min-w-full h-full flex flex-col p-2 border bg-green-300 border-green-300 rounded-2xl"
    >
      <div className="h-full flex flex-col mb-2">
        <div className="h-full">
          <textarea
            {...register('comment')}
            name="comment"
            className="block w-full h-full p-2 bg-gray-800 border border-green-400 text-green-400 rounded-xl focus:outline-none focus:ring ring-green-300"
          ></textarea>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <Button onClick={() => onCloseForm()} label="Cancel" customClass="basis-1/3"></Button>
        <Button type="submit" label="Send reply"></Button>
      </div>
    </form>
  )
}

export default AddCommentForm
