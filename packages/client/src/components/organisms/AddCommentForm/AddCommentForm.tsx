import { Button } from '@/components'

interface Props {
  isOpen: boolean
}

function AddCommentForm(props: Props) {
  const { isOpen } = props

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="min-w-full h-full flex flex-col p-[10px] border border-green-300 rounded-2xl"
    >
      <div className="h-full flex flex-col mb-[20px]">
        <div className="h-full">
          <textarea
            //   {...register('comment')}
            name="comment"
            className="block w-full h-full p-2 mt-1 bg-gray-800 border border-green-400 text-green-400 rounded-md focus:outline-none focus:ring ring-green-300"
          ></textarea>
        </div>
      </div>
      <div className="flex gap-[20px] w-[50%] mx-auto">
        <Button type="submit" label="Create"></Button>
        {/* <Button onClick={() => setIsAddComment(false)} label="Close"></Button> */}
      </div>
    </form>
  )
}

export default AddCommentForm
