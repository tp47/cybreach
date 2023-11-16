import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export default function Button({ label, ...props }: ButtonProps) {
  return (
    <button className="bg-green-500 border-2 h-10 border-green-500 text-sm" {...props}>
      {label}
    </button>
  )
}
