import { AvatarSVG } from '@/components'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import ThemeIconSVG from '@/components/atoms/ThemeIconSVG/ThemeIconSVG'
import { Link } from 'react-router-dom'

export default function MainHeader() {
  return (
    <header className="my-3 w-full">
      <div className="flex w-full">
        <h1 className="text-green-300 dark:text-purple-400 text-6xl uppercase text-center w-full">
          main menu
        </h1>
        <div className="absolute right-12 flex">
          <ThemeSwitcher />
          <Link to="/profile" className="bg-transparent group">
            <AvatarSVG className="w-[60px] fill-green-300 dark:fill-purple-400 group-hover:fill-green-400 dark:group-hover:fill-purple-500" />
          </Link>
        </div>
      </div>
    </header>
  )
}
