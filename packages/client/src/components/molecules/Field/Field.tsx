import { ErrorLine } from '@/components'
import { Input } from '@/components'
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form'

interface FieldProps {
  name: string
  type: string
  error: string | undefined
  label: Path<Record<string, string>>
  register: UseFormRegister<Record<string, string>>
  patternForm: ValidationRule<RegExp> | undefined
}

export default function Field(props: FieldProps) {
  const { label, name, type, error, register, patternForm } = props

  return (
    <div className="flex flex-col text-sm">
      <label className="block text-green-500">{label}</label>
      <Input
        register={register}
        patternForm={patternForm}
        label={label}
        type={type}
        autoComplete={name}
      />
      <ErrorLine error={error} />
    </div>
  )
}
