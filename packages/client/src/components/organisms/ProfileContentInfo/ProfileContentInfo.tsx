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
import { useContext, useState } from 'react'
import { UserContext } from '@/services/context'
import { Modal } from '../Modal'
import { Field } from '@/components/molecules/Field'
import { Password } from '@/types/user'

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
  const { setCurrentUser, setIsAuth } = useContext(UserContext)

  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const handleModal = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  const handleEdit = () => {
    console.log(isDisabled)
    setIsDisabled((isDisabled) => !isDisabled)
  }

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
            handleEdit()
          })
          .catch(() => setIsAuth(false))
      })
    }
  }

  const onSubmitPassword: SubmitHandler<FieldValues> = (data) => {
    if (data.new_password !== data.confirm_password) return

    const userData: Password = {
      oldPassword: data.old_password,
      newPassword: data.new_password,
    }

    AuthApi.updateUserPassword(userData).then(() => {
      handleModal()
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          {fields.map((field, index) => (
            <FieldProfile
              label={field.label}
              register={register}
              isDisabled={isDisabled}
              patternForm={field.patternForm}
              name={field.label}
              type={field.label}
              error={field.error}
              key={index}
            />
          ))}
        </div>
      </form>

      <div className="flex flex-col justify-between mt-8">
        {isDisabled ? (
          <Button
            onClick={handleEdit}
            label="Edit profile"
            className="bg-transparent text-green-400 text-left cursor-pointer"
          />
        ) : (
          <Button
            onClick={handleSubmit(onSubmit)}
            label="Submit changes"
            className="bg-transparent text-green-400 text-left cursor-pointer"
          />
        )}

        {!isDisabled && (
          <Button
            onClick={handleEdit}
            label="Cancel"
            className="bg-transparent text-red-400 text-left cursor-pointer"
          />
        )}
      </div>

      <div className="flex flex-col justify-between">
        {isDisabled && (
          <>
            <Button
              onClick={handleModal}
              label="Change password"
              className="bg-transparent text-gray-400 text-left cursor-pointer"
            />
            <Button
              label="Exit"
              onClick={() => onLogout()}
              className="bg-transparent text-red-400 text-left mt-4 cursor-pointer"
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
              <form className="pt-5" onSubmit={handleSubmit(onSubmitPassword)}>
                <Field
                  label={FieldsForm.OLD_PASSWORD}
                  register={register}
                  patternForm={{
                    value: passwordPattern,
                    message: 'Old password is not valid',
                  }}
                  name={FieldsForm.OLD_PASSWORD}
                  type={FieldsForm.PASSWORD}
                  error={errors?.password?.message}
                />
                <Field
                  label={FieldsForm.NEW_PASSWORD}
                  register={register}
                  patternForm={{
                    value: passwordPattern,
                    message: 'New password is not valid',
                  }}
                  name={FieldsForm.NEW_PASSWORD}
                  type={FieldsForm.PASSWORD}
                  error={errors?.password?.message}
                />
                <Field
                  label={FieldsForm.CONFIRM_PASSWORD}
                  register={register}
                  patternForm={{
                    value: passwordPattern,
                    message: 'Confirm password is not valid',
                  }}
                  name={FieldsForm.CONFIRM_PASSWORD}
                  type={FieldsForm.PASSWORD}
                  error={errors?.password?.message}
                />

                <div className="flex flex-col justify-between">
                  <Button
                    onClick={handleSubmit(onSubmitPassword)}
                    type="submit"
                    label="SUBMIT"
                    className="bg-slate-950 border-2 border-emerald-400 p-2 rounded-xl shadow shadow-emerald-400 text-gray-400 text-center w-full cursor-pointer"
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
