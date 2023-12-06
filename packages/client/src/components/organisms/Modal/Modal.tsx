interface IProps {
  content: JSX.Element
  isOpen: boolean
  title?: string
  handleModal: () => void
}

export default function Modal({ isOpen, content, title }: IProps): JSX.Element {
  const styles = {
    root: `
      absolute
      h-[100%]
      flex
      justify-center
      items-center
      w-[100%]
      top-0
      left-0
      z-5

      after:absolute
      after:w-[100%]
      after:h-[100%]
      after:top-0
      after:left-0
      after:z-5
      after:bg-slate-800
      after:opacity-80
    `,
    content: ``,
    modal: `
      text-white
      p-[20px]
      bg-slate-950
      w-[340px]
      relative
      z-10
      rounded-xl
      border-2
      border-emerald-400
      shadow
      shadow-emerald-400
    `,
    title: `
      text-xl
      text-slate-500
      uppercase
      text-center
      pt-[10px]
      font-bold
    `,
  }
  return (
    <>
      {isOpen ? (
        <div className={styles.root}>
          <div className={styles.modal}>
            {title ? <div className={styles.title}>{title}</div> : ''}

            <div className={styles.content}>{content}</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
