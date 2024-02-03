export default function LoaderStub({ inLayout }: undefined | any) {
  const inLayoutStyle = inLayout
    ? 'w-full border-2 border-green-300 dark:border-purple-400 rounded-2xl px-auto'
    : ''

  return (
    <div
      className={`${inLayoutStyle} flex justify-center items-center text-green-300 dark:text-purple-400 text-2xl text-bold h-full mx-auto uppercase`}
    >
      Loading ...
    </div>
  )
}
