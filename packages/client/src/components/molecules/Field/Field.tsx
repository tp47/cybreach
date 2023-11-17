import { ErrorLine } from '@/components'
import { Input } from '@/components'
import { FormFields } from '@/types/formFields'
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form'

interface FieldProps {
  name: string
  type: string
  error: string | undefined
  label: Path<FormFields>
  register: UseFormRegister<FormFields>
  pattern: ValidationRule<RegExp> | undefined
}

export default function Field(props: FieldProps) {
  const { label, name, type, error, register, pattern } = props

  return (
    <div className="flex flex-col text-sm">
      <label className="block text-green-500">{label}</label>
      <Input register={register} pattern={pattern} label={label} type={type} autoComplete={name} />
      <ErrorLine error={error} />
    </div>
  )
}
