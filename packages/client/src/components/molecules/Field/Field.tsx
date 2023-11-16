import { ErrorLine } from '@/components'
import { Input } from '@/components'

interface FieldProps {
  label: string
  type: string
  name: string
  error: string | null
}

export default function Field(props: FieldProps) {
  const { label, type, name, error } = props

  return (
    <div className="flex flex-col">
      <label className="block text-green-500" htmlFor={name}>
        {label}
      </label>
      <Input name={name} type={type} autoComplete={name} />
      <ErrorLine error={error} />
    </div>
  )
}
