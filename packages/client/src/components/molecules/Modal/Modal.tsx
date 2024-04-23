import { useRef, type MouseEvent as ReactMouseEvent } from 'react'

interface IProps {
  content?: JSX.Element
  children?: JSX.Element
  isOpen: boolean
  title?: string
  handleClose?: () => void
  handleModal?: () => void
}

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
    after:backdrop-blur-xl
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

export default function Modal({
  isOpen,
  content,
  title,
  children,
  handleClose,
}: IProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef && !modalRef.current!.contains(event.target as Node)) {
      handleClose && handleClose()
    }
  }

  return (
    <>
      {isOpen ? (
        <div className={styles.root} onClick={handleClickOutside}>
          <div className={styles.modal} ref={modalRef}>
            {title && <div className={styles.title}>{title}</div>}
            {content && <div className={styles.content}>{content}</div>}
            {children}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
