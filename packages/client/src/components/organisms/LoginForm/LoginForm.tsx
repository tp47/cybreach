import { Button, Field } from '@/components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { emailPattern, passwordPattern } from '../../../constants/validation.const'
import { FieldsForm } from '@/constants/fieldsForm'

interface FormProps {
  title?: string
  isPending?: boolean
  handleSubmit?: () => void
}

interface FieldValues extends Record<FieldsForm.EMAIL | FieldsForm.PASSWORD, string> {}

export default function LoginForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FieldValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="bg-gray-900 border-2 border-green-500 p-4">
      <h1 className="text-green-500 text-center text-lg mb-4 font-bold">BREACH IN</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Field
            label={FieldsForm.EMAIL}
            register={register}
            patternForm={{
              value: emailPattern,
              message: 'Email is not valid',
            }}
            name={FieldsForm.EMAIL}
            type={FieldsForm.EMAIL}
            error={errors?.email?.message}
          />
          <Field
            label={FieldsForm.PASSWORD}
            register={register}
            patternForm={{
              value: passwordPattern,
              message: 'Password is not valid',
            }}
            name={FieldsForm.PASSWORD}
            type={FieldsForm.PASSWORD}
            error={errors?.password?.message}
          />
          <div className="flex flex-col justify-between mt-8">
            <Button label="BREACH IN" type="submit" disabled={!isValid} />
          </div>
        </div>
      </form>

      <div className="flex flex-col justify-between">
        <Button label="NO ACCESS? PLUG IN!" type="button" />
      </div>
    </div>
  )
}
