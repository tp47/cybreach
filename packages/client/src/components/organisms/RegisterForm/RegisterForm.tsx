import { Button, Field } from '@/components'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  emailPattern,
  loginPattern,
  namePattern,
  passwordPattern,
  phonePattern,
} from '../../../constants/validation.const'
import { FieldsForm } from '@/constants/fieldsForm'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { UserAction } from '@/store/user/UserActions'
import { setUser } from '@/store/user/UserSlice'
import toLabel from '@/services/helpers/toLabel'

interface FieldValues
  extends Record<
    | FieldsForm.EMAIL
    | FieldsForm.PASSWORD
    | FieldsForm.FIRST_NAME
    | FieldsForm.SECOND_NAME
    | FieldsForm.LOGIN
    | FieldsForm.PHONE,
    string
  > {}

export default function RegisterForm() {
  const navigate = useNavigate()

  const { authError } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FieldValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(UserAction.register(data))
    dispatch(setUser(data))
  }

  const onSwitch = (): void => {
    navigate('/signin')
  }

  return (
    <div className="bg-gray-900 border-2 border-green-400 p-4 w-80 rounded-xl shadow-current transition-all duration-500">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-2 mb-4">
          <Field
            label={toLabel(FieldsForm.FIRST_NAME)}
            register={register}
            patternForm={{
              value: namePattern,
              message: 'First name is not valid',
            }}
            name={FieldsForm.FIRST_NAME}
            type="text"
            error={errors?.[FieldsForm.FIRST_NAME]?.message}
          />
          <Field
            label={toLabel(FieldsForm.SECOND_NAME)}
            register={register}
            patternForm={{
              value: namePattern,
              message: 'Second name is not valid',
            }}
            name={FieldsForm.SECOND_NAME}
            type="text"
            error={errors?.[FieldsForm.SECOND_NAME]?.message}
          />
          <Field
            label={toLabel(FieldsForm.LOGIN)}
            register={register}
            patternForm={{
              value: loginPattern,
              message: 'Login is not valid',
            }}
            name={FieldsForm.LOGIN}
            type="text"
            error={errors?.login?.message}
          />
          <Field
            label={toLabel(FieldsForm.EMAIL)}
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
            label={toLabel(FieldsForm.PASSWORD)}
            register={register}
            patternForm={{
              value: passwordPattern,
              message: 'Password is not valid',
            }}
            name={FieldsForm.PASSWORD}
            type={FieldsForm.PASSWORD}
            error={errors?.password?.message}
          />
          <Field
            label={toLabel(FieldsForm.PHONE)}
            register={register}
            patternForm={{
              value: phonePattern,
              message: 'Phone is not valid',
            }}
            name={FieldsForm.PHONE}
            type={FieldsForm.PHONE}
            error={errors?.phone?.message}
          />
          {authError && (
            <span className="text-red-500 text-sm w-full text-center items-center">
              {authError}
            </span>
          )}
          <div className="flex flex-col justify-between mt-8">
            <Button label="PLUG IN" type="submit" disabled={!isValid} customClass="h-10 py-[6px]" />
          </div>
        </div>
      </form>
      <div className="flex flex-col justify-between mb-4">
        <Button
          label="HAVE ACCESS? BREACH IN!"
          type="button"
          onClick={onSwitch}
          customClass="h-10 py-[6px]"
        />
      </div>
    </div>
  )
}
