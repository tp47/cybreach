import { Field } from '@/components'
import { Button } from '@/components'

interface FormProps {
  title?: string
  isPending?: boolean
  handleSubmit?: () => void
}

export default function LoginForm(props: FormProps) {
  // mock
  const errors = {
    email: 'wrong signature',
    password: 'wrong signature',
  }

  return (
    <form className="bg-gray-900 border-2 border-green-500 p-4">
      <h1 className="text-green-500 text-center text-lg mb-8 font-bold">BREACH IN</h1>
      <div className="mb-4">
        <Field name="email" label="email" type="email" error={errors.email} />
        <Field name="password" label="password" type="password" error={errors.password} />
      </div>
      <div className="flex flex-col justify-between gap-4 mt-8">
        <Button label="BREACH IN" type="submit" />
        <Button label="NO ACCESS? PLUG IN!" type="button" />
      </div>
    </form>
  )
}
