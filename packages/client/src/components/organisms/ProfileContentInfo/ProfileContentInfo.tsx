import { FieldsForm } from '@/constants/fieldsForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { emailPattern, loginPattern, namePattern, phonePattern } from '@/constants/validation.const'
import { Button } from '@/components/atoms'
import FieldProfile from '@/components/molecules/FieldProfile/FieldProfile'
import { useNavigate } from 'react-router-dom'

interface FieldValues
  extends Record<
    | FieldsForm.EMAIL
    | FieldsForm.FIRST_NAME
    | FieldsForm.SECOND_NAME
    | FieldsForm.LOGIN
    | FieldsForm.PHONE,
    string
  > {}

export default function ProfileContentInfo(): JSX.Element {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      'first name': 'Иван',
      email: 'pochta@yandex.com',
      login: 'ivanivan',
      'second name': 'Иванов',
      phone: '+7 (999) 854 34 32',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    alert(JSON.stringify(data))
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
      error: errors?.['first name']?.message,
      patternForm: {
        value: namePattern,
        message: 'Name is not valid',
      },
    },
    {
      label: FieldsForm.SECOND_NAME,
      error: errors?.['second name']?.message,
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
          onClick={() => navigate('/')}
          className="bg-transparent text-emerald-400 text-left mt-4 cursor-pointer"
        />
      </div>
    </div>
  )
}
