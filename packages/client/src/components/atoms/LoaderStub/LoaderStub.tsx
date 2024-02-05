export default function LoaderStub({ inLayout }: undefined | any) {
  const inLayoutStyle = inLayout
    ? 'w-full border-2 border-green-300 dark:border-pink-500 rounded-2xl px-auto'
    : ''

  return (
    <div
      className={`${inLayoutStyle} flex justify-center items-center text-green-300 dark:text-purple-200 text-2xl text-bold h-full mx-auto uppercase`}
    >
      Loading ...
    </div>
  )
}
