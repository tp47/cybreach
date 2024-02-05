import { FieldsForm } from '@/constants/fieldsForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  displayName,
  emailPattern,
  loginPattern,
  namePattern,
  passwordPattern,
  phonePattern,
} from '@/constants/validation.const'
import { Button } from '@/components/atoms'
import { FieldProfile } from '@/components/molecules/FieldProfile'
import { User } from '@/types'
import { AuthApi } from '@/services/api'
import { Modal } from '../Modal'
import { Field } from '@/components/molecules/Field'
import { Password } from '@/types/user'
import { useAppDispatch } from '@/hooks'
import { useState } from 'react'
import { UserAction } from '@/store/user/UserActions'
import toLabel from '@/services/helpers/toLabel'

interface FieldValues
  extends Record<
    | FieldsForm.EMAIL
    | FieldsForm.FIRST_NAME
    | FieldsForm.SECOND_NAME
    | FieldsForm.DISPLAY_NAME
    | FieldsForm.LOGIN
    | FieldsForm.PHONE
    | FieldsForm.PASSWORD
    | FieldsForm.CONFIRM_PASSWORD
    | FieldsForm.NEW_PASSWORD
    | FieldsForm.OLD_PASSWORD,
    string
  > {}

interface IProps {
  onLogout: () => void
  user: User | null
}

export default function ProfileContentInfo({ onLogout, user }: IProps): JSX.Element {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isErrorPassword, setIsErrorPassword] = useState(false)

  const handleModal = () => {
    setIsOpen((isOpen) => !isOpen)
    setIsErrorPassword(false)
    reset({ old_password: '', new_password: '', confirm_password: '' })
  }

  const handleEdit = () => {
    setIsDisabled((isDisabled) => !isDisabled)
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
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

      dispatch(UserAction.update(user)).then(() => {
        dispatch(UserAction.get())
        handleEdit()
      })
    }
  }

  const onSubmitPassword: SubmitHandler<FieldValues> = (data) => {
    if (data.new_password !== data.confirm_password) return

    const userData: Password = {
      oldPassword: data.old_password,
      newPassword: data.new_password,
    }

    AuthApi.updateUserPassword(userData)
      .then(() => {
        handleModal()
        setIsErrorPassword(false)
      })
      .catch(() => {
        setIsErrorPassword(true)
      })
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
        value: displayName,
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
    <div className="h-full flex flex-col justify-between">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <FieldProfile
            label={toLabel(field.label)}
            register={register}
            isDisabled={isDisabled}
            patternForm={field.patternForm}
            name={field.label}
            type={field.label}
            error={field.error}
            key={index}
          />
        ))}
      </form>

      <div className="flex flex-col justify-between mt-8">
        {isDisabled ? (
          <Button
            onClick={handleEdit}
            label="Edit profile"
            className="bg-transparent text-green-400 dark:text-purple-500 text-right text-lg mt-auto cursor-pointer hover:underline "
          />
        ) : (
          <Button
            onClick={handleSubmit(onSubmit)}
            label="Submit changes"
            className="bg-transparent text-green-400 dark:text-purple-500 text-right text-lg mt-2 cursor-pointer hover:underline"
          />
        )}

        {!isDisabled && (
          <Button
            onClick={handleEdit}
            label="Cancel"
            className="bg-transparent text-red-400 text-right text-lg mt-2 cursor-pointer hover:underline"
          />
        )}
        {isDisabled && (
          <>
            <Button
              onClick={handleModal}
              label="Change password"
              className="bg-transparent text-gray-400 text-right text-lg mt-2 cursor-pointer hover:underline"
            />
            <Button
              label="Exit"
              onClick={() => onLogout()}
              className="bg-transparent text-red-400 text-right text-lg mt-2 cursor-pointer hover:underline"
            />
          </>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        handleModal={handleModal}
        title="change password"
        content={
          <div>
            <div>
              <form className="pt-5 h-full" onSubmit={handleSubmit(onSubmitPassword)}>
                <Field
                  label={toLabel(FieldsForm.OLD_PASSWORD)}
                  register={register}
                  patternForm={{
                    value: passwordPattern,
                    message: 'Old password is not valid',
                  }}
                  name={FieldsForm.OLD_PASSWORD}
                  type={FieldsForm.PASSWORD}
                  error={errors?.old_password?.message}
                />
                <Field
                  label={toLabel(FieldsForm.NEW_PASSWORD)}
                  register={register}
                  patternForm={{
                    value: passwordPattern,
                    message: 'New password is not valid',
                  }}
                  name={FieldsForm.NEW_PASSWORD}
                  type={FieldsForm.PASSWORD}
                  error={errors?.new_password?.message}
                />
                <Field
                  label={toLabel(FieldsForm.CONFIRM_PASSWORD)}
                  register={register}
                  patternForm={{
                    value: passwordPattern,
                    message: 'Confirm password is not valid',
                  }}
                  name={FieldsForm.CONFIRM_PASSWORD}
                  type={FieldsForm.PASSWORD}
                  error={errors?.confirm_password?.message}
                />
                {isErrorPassword ? (
                  <div className="text-red-500 text-center mb-2">Password is incorrect</div>
                ) : (
                  ''
                )}
                <div className="flex flex-col justify-between">
                  <Button
                    onClick={handleSubmit(onSubmitPassword)}
                    type="submit"
                    label="SUBMIT"
                    disabled={isValid ? false : true}
                  />
                </div>
              </form>
              <Button
                label="CANCEL"
                onClick={() => handleModal()}
                className="text-emerald-400 w-full text-center mt-4 cursor-pointer"
              />
            </div>
          </div>
        }
      />
    </div>
  )
}
