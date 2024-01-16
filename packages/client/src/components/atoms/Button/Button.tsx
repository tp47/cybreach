import { useAppSelector } from '@/hooks'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export default function Button({ label, ...props }: ButtonProps) {
  const darkMode = useAppSelector((state) => state.theme.darkMode)

  const buttonClass = darkMode
    ? `
    bg-purple-900
    border-2
    border-purple-400
    rounded-md
    py-[4px] px-[8px]
    w-full
    shadow-[0px_0px_4px_1px]
    shadow-purple-400
    text-white
    hover:bg-purple-400
    hover:text-purple-900
    disabled:bg-stone-500
    disabled:text-emerald-100
    disabled:cursor-not-allowed
    disabled:shadow-none
    disabled:border-stone-500
    active:bg-emerald-600
    active:text-purple-700
    transition-all
    duration-750
    uppercase
  `
    : `
    bg-green-950
    border-2
    border-green-300
    rounded-md
    py-[4px] px-[8px]
    w-full
    shadow-[0px_0px_4px_1px]
    shadow-green-300
    text-white
    hover:bg-green-300
    hover:text-green-950
    disabled:bg-stone-500
    disabled:text-emerald-100
    disabled:cursor-not-allowed
    disabled:shadow-none
    disabled:border-stone-500
    active:bg-emerald-600
    active:text-green-500
    transition-all
    duration-750
    uppercase
  `

  return (
    <button className={buttonClass} {...props}>
      {label}
    </button>
  )
}
