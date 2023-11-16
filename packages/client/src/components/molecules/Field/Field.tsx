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
    <div className="flex flex-col text-sm">
      <label className="block text-green-500">
        {label}
        <Input name={name} type={type} autoComplete={name} />
      </label>
      <ErrorLine error={error} />
    </div>
  )
}
