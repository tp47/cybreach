import { ErrorLine } from '@/components'
import { Input } from '@/components'
import { Path, UseFormRegister, ValidationRule, FieldValues } from 'react-hook-form'

interface FieldProps<T extends FieldValues> {
  name: string
  type: string
  error?: string
  label: Path<Record<string, string>>
  register: UseFormRegister<Record<string, string>>
  patternForm?: ValidationRule<RegExp>
  bigLabel?: boolean | null | undefined
}

export default function Field<T extends FieldValues>(props: FieldProps<T>) {
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
