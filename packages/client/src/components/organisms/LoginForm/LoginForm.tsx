import { Button, Field } from '@/components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { loginPattern, passwordPattern } from '../../../constants/validation.const'
import { FieldsForm } from '@/constants/fieldsForm'
import { AuthApi } from '@/services/api'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '@/services/context'

interface FieldValues extends Record<FieldsForm.LOGIN | FieldsForm.PASSWORD, string> {}

export default function LoginForm() {
  const [error, setError] = useState<Error | null>(null)
  const { setIsAuth, setCurrentUser } = useContext(UserContext)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FieldValues>({ mode: 'onBlur' })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const setUser = () => {
      AuthApi.getUser().then((user) => setCurrentUser(user))
    }

    AuthApi.loginUser(data)
      .then(() => setIsAuth(true))
      .then(() => setUser())
      .catch((e) => setError(e))
  }

  return (
    <div className="bg-gray-900 border-2 border-green-500 p-4">
      <h1 className="text-green-500 text-center text-lg mb-4 font-bold">BREACH IN</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <Field
            label={FieldsForm.LOGIN}
            register={register}
            patternForm={{
              value: loginPattern,
              message: 'Login is not valid',
            }}
            name={FieldsForm.LOGIN}
            type={FieldsForm.LOGIN}
            error={errors?.login?.message}
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
          {error && (
            <span className="text-red-500 text-sm w-full text-center items-center">
              {error.message}
            </span>
          )}
          <div className="flex flex-col justify-between mt-8">
            <Button label="BREACH IN" type="submit" disabled={!isValid} />
          </div>
        </div>
      </form>

      <div className="flex flex-col justify-between">
        <Button label="NO ACCESS? PLUG IN!" type="button" onClick={() => navigate('/signup')} />
      </div>
    </div>
  )
}
