import { useAppSelector } from '@/hooks'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  image?: any
  customClass?: string
}

export default function Button({ label, image, ...props }: ButtonProps) {
  const darkMode = useAppSelector((state) => state.theme.darkMode)
  const { customClass } = props

  const buttonClass = darkMode
    ? `
    bg-purple-950
    border-2
    border-pink-500
    rounded-lg
    py-[12px] px-[15px]
    w-full
    shadow-[0px_0px_4px_1px]
    shadow-pink-600
    text-white
    active:bg-purple-300
    active:text-purple-950
    disabled:bg-stone-500
    disabled:text-stone-400
    disabled:shadow-none
    disabled:border-stone-500
    disabled:cursor-not-allowed
    hover:bg-pink-600
    hover:text-purple-200
    transition-all
    duration-750
    uppercase
    text-base
    `
    : `
    bg-green-950
    border-2
    border-green-300
    rounded-lg
    py-[12px] px-[15px]
    w-full
    shadow-[0px_0px_4px_1px]
    shadow-green-300
    text-white
    hover:bg-green-300
    hover:text-green-950
    disabled:bg-stone-500
    disabled:text-stone-400
    disabled:shadow-none
    disabled:border-stone-500
    disabled:cursor-not-allowed
    active:bg-emerald-600
    active:text-green-300
    transition-all
    duration-750
    uppercase
    text-base
  `

  return (
    <button className={`${buttonClass} ${customClass}`} {...props}>
      {label}
      {image}
    </button>
  )
}
