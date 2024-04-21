interface ErrorLineProps {
  error: string | unknown | undefined
}

export default function ErrorLine({ error }: ErrorLineProps) {
  const isReadableError = error && typeof error === 'string'

  return isReadableError ? (
    <span className="text-red-500 w-full text-right mt-1 text-xs min-h-[1rem] h-auto">{error}</span>
  ) : (
    <span className="min-h-[1rem] mt-1" />
  )
}
