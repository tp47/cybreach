import { Button, Field } from '@/components'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  emailPattern,
  loginPattern,
  namePattern,
  passwordPattern,
  phonePattern,
} from '../../../constants/validation.const'
import { FormFields } from '@/types/formFields'
import { FieldsForm } from '@/constants/fieldsForm.enum'

interface FormProps {
  title?: string
  isPending?: boolean
  handleSubmit?: () => void
}

export default function RegisterForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormFields>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="bg-gray-900 border-2 border-green-500 p-4">
      <h1 className="text-green-500 text-center text-lg mb-4 font-bold">PLUG IN</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Field
            label={FieldsForm.FIRST_NAME}
            register={register}
            pattern={{
              value: namePattern,
              message: 'First name is not valid',
            }}
            name={FieldsForm.FIRST_NAME}
            type="text"
            error={errors?.[FieldsForm.FIRST_NAME]?.message}
          />
          <Field
            label={FieldsForm.SECOND_NAME}
            register={register}
            pattern={{
              value: namePattern,
              message: 'Second name is not valid',
            }}
            name={FieldsForm.SECOND_NAME}
            type="text"
            error={errors?.[FieldsForm.SECOND_NAME]?.message}
          />
          <Field
            label={FieldsForm.LOGIN}
            register={register}
            pattern={{
              value: loginPattern,
              message: 'Login is not valid',
            }}
            name={FieldsForm.LOGIN}
            type="text"
            error={errors?.login?.message}
          />
          <Field
            label={FieldsForm.EMAIL}
            register={register}
            pattern={{
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
            pattern={{
              value: passwordPattern,
              message: 'Password is not valid',
            }}
            name={FieldsForm.PASSWORD}
            type={FieldsForm.PASSWORD}
            error={errors?.password?.message}
          />
          <Field
            label={FieldsForm.PHONE}
            register={register}
            pattern={{
              value: phonePattern,
              message: 'Phone is not valid',
            }}
            name={FieldsForm.PHONE}
            type={FieldsForm.PHONE}
            error={errors?.phone?.message}
          />
          <div className="flex flex-col justify-between mt-8">
            <Button label="PLUG IN" type="submit" disabled={!isValid} />
          </div>
        </div>
      </form>
      <div className="flex flex-col justify-between">
        <Button label="HAVE ACCESS? BREACH IN!" type="button" />
      </div>
    </div>
  )
}
