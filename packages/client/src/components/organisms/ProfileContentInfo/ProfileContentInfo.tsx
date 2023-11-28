import { FieldsForm } from '@/constants/fieldsForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { emailPattern, loginPattern, namePattern, phonePattern } from '@/constants/validation.const'
import { Button } from '@/components/atoms'
import FieldProfile from '@/components/molecules/FieldProfile/FieldProfile'
import { User } from '@/types'
import { AuthApi } from '@/services/api'
import { useContext } from 'react'
import { UserContext } from '@/services/context'

interface FieldValues
  extends Record<
    | FieldsForm.EMAIL
    | FieldsForm.FIRST_NAME
    | FieldsForm.SECOND_NAME
    | FieldsForm.DISPLAY_NAME
    | FieldsForm.LOGIN
    | FieldsForm.PHONE,
    string
  > {}

interface IProps {
  onLogout: () => void
  user: User | null
}

export default function ProfileContentInfo({ onLogout, user }: IProps): JSX.Element {
  const { setCurrentUser, setIsAuth } = useContext(UserContext)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      first_name: user?.first_name,
      email: user?.email,
      login: user?.login,
      display_name: user?.display_name,
      second_name: user?.second_name,
      phone: user?.phone,
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isValid) {
      const user: Omit<User, 'password'> = {
        first_name: data?.first_name,
        email: data?.email,
        login: data?.login,
        display_name: data?.display_name,
        second_name: data?.second_name,
        phone: data?.phone,
      }

      AuthApi.updateUserProfile(user).then(() => {
        AuthApi.getUser()
          .then((data) => {
            setCurrentUser(data)
            setIsAuth(true)
          })
          .catch(() => setIsAuth(false))
      })
    }
  }

  const fields = [
    {
      label: FieldsForm.EMAIL,
      error: errors?.email?.message,
      patternForm: {
        value: emailPattern,
        message: 'Email is not valid',
      },
    },
    {
      label: FieldsForm.LOGIN,
      error: errors?.login?.message,
      patternForm: {
        value: loginPattern,
        message: 'Login is not valid',
      },
    },
    {
      label: FieldsForm.FIRST_NAME,
      error: errors?.first_name?.message,
      patternForm: {
        value: namePattern,
        message: 'Name is not valid',
      },
    },
    {
      label: FieldsForm.DISPLAY_NAME,
      error: errors?.display_name?.message,
      patternForm: {
        value: namePattern,
        message: 'Display name is not valid',
      },
    },
    {
      label: FieldsForm.SECOND_NAME,
      error: errors?.second_name?.message,
      patternForm: {
        value: namePattern,
        message: 'Second name is not valid',
      },
    },
    {
      label: FieldsForm.PHONE,
      error: errors?.phone?.message,
      patternForm: {
        value: phonePattern,
        message: 'Phone is not valid',
      },
    },
  ]

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          {fields.map((field, index) => (
            <FieldProfile
              label={field.label}
              register={register}
              patternForm={field.patternForm}
              name={field.label}
              type={field.label}
              error={field.error}
              key={index}
            />
          ))}

          <div className="flex flex-col justify-between mt-8">
            <Button
              label="EDIT PROFILE"
              type="submit"
              className="bg-transparent text-gray-400 text-left cursor-pointer"
            />
          </div>
        </div>
      </form>

      <div className="flex flex-col justify-between">
        <Button
          label="CHANGE PASSWORD"
          className="bg-transparent text-gray-400 text-left cursor-pointer"
        />
        <Button
          label="EXIT"
          onClick={() => onLogout()}
          className="bg-transparent text-emerald-400 text-left mt-4 cursor-pointer"
        />
      </div>
    </div>
  )
}
