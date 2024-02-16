type ErrorStubProps = {
  message: string
}

export default function ErrorStub({ message }: ErrorStubProps) {
  return (
    <div className="flex w-full h-full gap-2 text-red-600 text-4xl justify-center mx-auto items-center uppercase">
      {message}
    </div>
  )
}
