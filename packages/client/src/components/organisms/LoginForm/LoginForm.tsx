import { Button, Field } from '@/components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { loginPattern, passwordPattern } from '../../../constants/validation.const'
import { FieldsForm } from '@/constants/fieldsForm'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { UserAction } from '@/store/user/UserActions'
import { AuthApi } from '@/services/api'

interface FieldValues extends Record<FieldsForm.LOGIN | FieldsForm.PASSWORD, string> {}

export default function LoginForm() {
  const { authError } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FieldValues>({ mode: 'onBlur' })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(UserAction.login(data))
  }

  const onSwitch = (): void => {
    navigate('/signup')
  }

  const handleOAuth = async () => {
    try {
      const CLIENT_ID = await AuthApi.getServiceId().then((data) => data.service_id)
      const REDIRECT_URI = encodeURIComponent('http://localhost:3000')
      const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`

      document.location.href = authUrl
    } catch (error) {
      console.log(`Ошибка: ${error}`)
    }
  }

  return (
    <div className="bg-gray-900 border-2 border-green-400 p-4 w-72 rounded-xl transition-all duration-500">
      <h1 className="text-green-400 text-center text-lg mb-4 font-bold">BREACH IN</h1>

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
          {authError && (
            <span className="text-red-500 text-sm w-full text-center items-center">
              {authError}
            </span>
          )}
          <div className="flex flex-col justify-between mt-8">
            <Button label="BREACH IN" type="submit" disabled={!isValid} />
          </div>
        </div>
      </form>

      <div className="flex flex-col justify-between">
        <Button label="OAuth" type="button" onClick={handleOAuth} />
      </div>

      <div className="flex flex-col justify-between">
        <Button label="NO ACCESS? PLUG IN!" type="button" onClick={onSwitch} />
      </div>
    </div>
  )
}
