import { FormEventHandler } from 'react'
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form'

interface FormData {
  email: string
  password: string
  'first name': string
  'second name': string
  login: string
  phone: string
}
interface InputProps {
  handleInput?: FormEventHandler<HTMLInputElement>
  label: Path<FormData>
  register: UseFormRegister<FormData>
  pattern: ValidationRule<RegExp> | undefined
  type: string
  autoComplete: string
}

export default function Input(props: InputProps) {
  const { handleInput, label, register, pattern, type, autoComplete } = props

  return (
    <input
      className="w-full p-2 mt-1 bg-gray-800 border border-green-500 text-green-500"
      {...register(label, {
        required: 'Field must be filled in',
        pattern: pattern,
      })}
      onInput={handleInput}
      type={type}
      autoComplete={autoComplete}
    />
  )
}
