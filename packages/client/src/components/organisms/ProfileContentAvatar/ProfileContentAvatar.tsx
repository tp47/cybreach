import { User } from '@/types'
import { Modal } from '../Modal'
import { useState } from 'react'
import { Button } from '@/components/atoms'
import { AuthApi } from '@/services/api'

interface IProps {
  user: User | null
}

export default function ProfileContentAvatar({ user }: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File>()

  const styles = {
    name: `
    flex
    justify-center
    text-green-300
    text-5xl
    uppercase
    font-normal
  `,
    image: `
    bg-profile
    cursor-pointer
    h-[260px]
    w-[438px]
    mt-10
  `,
    icons: `
    flex
    w-[100%]
    justify-center
    gap-3
  `,
    icon: `
    h-[28px]
    w-[28px]
    bg-no-repeat
    bg-cover
  `,
    imageBox: `
    w-[438px]
  `,
  }

  const handleChangeAvatarModal = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  const handleSubmit = () => {
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)

      AuthApi.updateUserAvatar(formData).then(() => handleChangeAvatarModal())
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
        <div className={styles.image} onClick={() => handleChangeAvatarModal()} />
        <div className={styles.icons}>
          <div className={`${styles.icon} bg-like`} />
          <div className={`${styles.icon} bg-romb`} />
          <div className={`${styles.icon} bg-battery`} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        handleModal={handleChangeAvatarModal}
        title="change avatar"
        content={
          <div>
            <div className="mt-20 mb-20 text-center text-emerald-400">
              <label htmlFor="file">Upload file</label>
              <input
                name="file"
                id="file"
                type="file"
                placeholder="file"
                className="hidden"
                onInput={(event) => handleAddFile(event)}
              />
            </div>
            <div className="flex flex-col justify-between">
              <Button onClick={() => handleSubmit()} type="submit" label="SUBMIT" />
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
