import { FormEventHandler, InputHTMLAttributes } from 'react'
import { Path, UseFormRegister, ValidationRule, FieldValues } from 'react-hook-form'

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  handleInput?: FormEventHandler<HTMLInputElement>
  label: Path<Record<string, string>>
  register: UseFormRegister<Record<string, string>>
  patternForm: ValidationRule<RegExp> | undefined
}

export default function Input<T extends FieldValues>(props: InputProps<T>) {
  const { handleInput, label, register, patternForm } = props

  return (
    <input
      className="w-full p-2 mt-1 bg-gray-800 border border-green-400 dark:border-purple-600 text-green-400 dark:text-pink-500 rounded-md focus:outline-none focus:ring ring-green-300 dark:ring-pink-600"
      {...register(label, {
        required: 'Field must be filled in',
        pattern: patternForm,
      })}
      onInput={handleInput}
      {...props}
    />
  )
}
