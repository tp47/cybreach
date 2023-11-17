import { FormEventHandler, InputHTMLAttributes } from 'react'
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleInput?: FormEventHandler<HTMLInputElement>
  label: Path<Record<string, string>>
  register: UseFormRegister<Record<string, string>>
  patternForm: ValidationRule<RegExp> | undefined
  type: string
  autoComplete: string
}

export default function Input(props: InputProps) {
  const { handleInput, label, register, patternForm, type, autoComplete } = props

  return (
    <input
      className="w-full p-2 mt-1 bg-gray-800 border border-green-500 text-green-500"
      {...register(label, {
        required: 'Field must be filled in',
        pattern: patternForm,
      })}
      onInput={handleInput}
      type={type}
      autoComplete={autoComplete}
    />
  )
}
