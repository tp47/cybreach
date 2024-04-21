import { ErrorLine, Input } from '@/components'
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form'

interface FieldProps {
  name: string
  type: string
  error?: string
  label: Path<Record<string, string>>
  register: UseFormRegister<any>
  patternForm?: ValidationRule<RegExp>
  bigLabel?: boolean | null | undefined
}

export default function Field(props: FieldProps) {
  const { label, name, type, error, register, patternForm, bigLabel } = props

  return (
    <div className={`flex flex-col ${bigLabel ? 'text-xl uppercase' : 'text-sm'}`}>
      <label className="block text-emerald-400 dark:text-purple-500">{label}</label>
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
