import { AvatarSVG } from '@/components'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Link } from 'react-router-dom'

type MainHeaderProps = {
  showTutorial: boolean
}

export default function MainHeader({ showTutorial }: MainHeaderProps) {
  return (
    <header className="my-3 w-full min-h-[60px]">
      <div className="flex w-full">
        {showTutorial && (
          <h1 className="text-green-300 dark:text-pink-600 text-6xl uppercase text-center w-full my-auto">
            tutorial
          </h1>
        )}
        <div className="absolute right-12 flex">
          <ThemeSwitcher />
          <Link to="/profile" className="bg-transparent group">
            <AvatarSVG className="w-[60px] fill-green-300 dark:fill-pink-500 group-hover:fill-green-400 dark:group-hover:fill-pink-600" />
          </Link>
        </div>
      </div>
    </header>
  )
}
