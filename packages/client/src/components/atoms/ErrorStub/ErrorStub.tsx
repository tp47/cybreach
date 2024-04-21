type ErrorStubProps = {
  message: string
}

export default function ErrorStub({ message }: ErrorStubProps) {
  return (
    <div className="flex h-full px-32 gap-2 text-red-600 text-2xl text-center mx-auto items-center justify-center bg-custom-warning uppercase">
      {message}
    </div>
  )
}
