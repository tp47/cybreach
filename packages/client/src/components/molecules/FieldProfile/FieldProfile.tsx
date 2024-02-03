import { ErrorLine, Input } from '@/components'
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form'

interface FieldProps {
  name: string
  type: string
  error: string | undefined
  label: Path<Record<string, string>>
  register: UseFormRegister<Record<string, string>>
  patternForm: ValidationRule<RegExp> | undefined
  isDisabled?: boolean
}

export default function FieldProfile(props: FieldProps) {
  const { label, name, type, error, register, patternForm, isDisabled } = props

  return (
    <div className="text-sm justify-between">
      <div className="flex pb-2 border-emerald-500 dark:border-purple-400 border-b-2 items-end">
        <label className="block text-gray-400 uppercase w-[150px]" htmlFor={name}>
          {label}
        </label>
        <Input
          register={register}
          patternForm={patternForm}
          label={label}
          type={type}
          autoComplete={name}
          id={name}
          disabled={isDisabled}
          className="w-full mt-1 bg-transparent text-gray-500 text-right outline-0 font-bold"
        />
      </div>
      <div className="mt-2 mb-2">
        <ErrorLine error={error} />
      </div>
    </div>
  )
}
