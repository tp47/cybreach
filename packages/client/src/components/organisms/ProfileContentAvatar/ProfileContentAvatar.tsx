import { User } from '@/types'
import { Modal } from '../Modal'
import { useState } from 'react'
import { Button } from '@/components/atoms'
import { AuthApi } from '@/services/api'
import { UserAction } from '@/store/user/UserActions'
import { useAppDispatch } from '@/hooks'
import { UNSET_AVATAR_PATH, RESOURCES_URL } from '@/constants/avatarsPath'

interface IProps {
  user: User | null
}

export default function ProfileContentAvatar({ user }: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isError, setIsError] = useState(false)
  const dispatch = useAppDispatch()

  const styles = {
    name: `
    text-5xl
    text-gray-300
    uppercase
    font-normal
    text-center
    dark:text-gray-500
  `,
    image: `
    cursor-pointer
    mt-10
    bg-cover
    max-w-[470px]
    border-2
    border-green-300
    dark:border-pink-500
    rounded-xl
  `,
    icons: `
    flex
    mt-2
    w-[100%]
    justify-center
    gap-3
  `,
    icon: `
    h-[28px]
    w-[28px]
    bg-no-repeat
    bg-cover
    fill-green-300
    dark:fill-purple-600
  `,
    imageBox: `
    w-full
  `,
  }

  const handleChangeAvatarModal = () => {
    setFile(null)
    setIsOpen((isOpen) => !isOpen)
  }

  const handleSubmit = () => {
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)

      AuthApi.updateUserAvatar(formData)
        .then(() => {
          handleChangeAvatarModal()
          dispatch(UserAction.get())
          setIsError(false)
        })
        .catch(() => {
          setIsError(true)
        })
    }
  }

  const handleAddFile = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.target) {
      const element = event.target as HTMLInputElement

      if (element.files) {
        const file = element.files[0]

        setFile(file)
      }
    }
  }

  return (
    <div>
      <div className={styles.name}>{user?.display_name}</div>

      <div className={styles.imageBox}>
        <div onClick={() => handleChangeAvatarModal()}>
          <img
            className={styles.image}
            src={user?.avatar ? `${RESOURCES_URL}${user?.avatar}` : `${UNSET_AVATAR_PATH}`}
            alt="user profile avatar"
          />
        </div>
        {/* <div className={styles.icons}>
          <div className={`${styles.icon} bg-like`} />
          <div className={`${styles.icon} bg-romb`} />
          <div className={`${styles.icon} bg-battery`} />
        </div> */}
      </div>

      <Modal
        isOpen={isOpen}
        handleModal={handleChangeAvatarModal}
        title="change avatar"
        content={
          <div>
            <div className="mt-20 mb-20 text-center text-emerald-400">
              <label htmlFor="file">{file ? file.name : 'Upload file'}</label>
              <input
                name="file"
                id="file"
                type="file"
                placeholder="file"
                className="hidden"
                onInput={(event) => handleAddFile(event)}
              />
            </div>
            {isError ? <div className="mb-2 text-red-500 text-center">Error upload file</div> : ''}
            <div className="flex flex-col justify-between">
              <Button
                onClick={() => handleSubmit()}
                type="submit"
                label="SUBMIT"
                disabled={file ? false : true}
              />
              <Button
                label="CANCEL"
                onClick={() => handleChangeAvatarModal()}
                className="text-emerald-400 w-full text-center mt-4 cursor-pointer"
              />
            </div>
          </div>
        }
      />
    </div>
  )
}
