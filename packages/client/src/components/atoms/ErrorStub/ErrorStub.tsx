type ErrorStubProps = {
  message: string
}

export default function ErrorStub({ message }: ErrorStubProps) {
  return (
    <div className="flex w-full h-full gap-2 text-red-600 text-2xl text-center mx-auto px-32 items-center bg-custom-warning">
      {message}
    </div>
  )
}
