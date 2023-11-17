import { ErrorLine } from '@/components'
import { Input } from '@/components'
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}
interface FieldProps {
  name: string
  type: string
  error: string | undefined
  label: Path<FormData>
  register: UseFormRegister<FormData>
  pattern: ValidationRule<RegExp> | undefined
}

export default function Field(props: FieldProps) {
  const { label, name, type, error, register, pattern } = props

  return (
    <div className="flex flex-col">
      <label className="block text-green-500">{label}</label>
      <Input register={register} pattern={pattern} label={label} type={type} autoComplete={name} />
      <ErrorLine error={error} />
    </div>
  )
}
