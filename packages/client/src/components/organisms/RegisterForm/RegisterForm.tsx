import { Button, Field } from '@/components'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  emailPattern,
  loginPattern,
  namePattern,
  passwordPattern,
  phonePattern,
} from '../patternsForm'

interface FormProps {
  title?: string
  isPending?: boolean
  handleSubmit?: () => void
}

interface FormData {
  email: string
  password: string
  'first name': string
  'second name': string
  login: string
  phone: string
}

export default function RegisterForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="bg-gray-900 border-2 border-green-500 p-4">
      <h1 className="text-green-500 text-center text-lg mb-4 font-bold">PLUG IN</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Field
            label="first name"
            register={register}
            pattern={{
              value: namePattern,
              message: 'First name is not valid',
            }}
            name="first name"
            type="text"
            error={errors?.['first name']?.message}
          />
          <Field
            label="second name"
            register={register}
            pattern={{
              value: namePattern,
              message: 'Second name is not valid',
            }}
            name="second name"
            type="text"
            error={errors?.['second name']?.message}
          />
          <Field
            label="login"
            register={register}
            pattern={{
              value: loginPattern,
              message: 'Login is not valid',
            }}
            name="login"
            type="text"
            error={errors?.login?.message}
          />
          <Field
            label="email"
            register={register}
            pattern={{
              value: emailPattern,
              message: 'Email is not valid',
            }}
            name="email"
            type="email"
            error={errors?.email?.message}
          />
          <Field
            label="password"
            register={register}
            pattern={{
              value: passwordPattern,
              message: 'Password is not valid',
            }}
            name="password"
            type="password"
            error={errors?.password?.message}
          />
          <Field
            label="phone"
            register={register}
            pattern={{
              value: phonePattern,
              message: 'Phone is not valid',
            }}
            name="phone"
            type="phone"
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
