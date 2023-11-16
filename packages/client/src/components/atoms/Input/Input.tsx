import { InputHTMLAttributes, FormEventHandler } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleInput?: FormEventHandler<HTMLInputElement>
}

export default function Input(props: InputProps) {
  const { handleInput } = props

  return (
    <input
      className="w-full p-2 mt-1 bg-gray-800 border border-green-500 text-green-500"
      onInput={handleInput}
      {...props}
    />
  )
}
