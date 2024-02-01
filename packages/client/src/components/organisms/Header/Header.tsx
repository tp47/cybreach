import { AvatarSVG, BackButtonSVG, Button } from '@/components'
import { Link, useNavigate } from 'react-router-dom'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Header({ ...props }) {
  const { title, icon } = props
  const navigate = useNavigate()

  return (
    <header className=" w-full">
      <div className="flex w-full h-[60px] my-3 justify-center items-center">
        <Button
          className="mr-auto my-auto"
          image={
            <BackButtonSVG className="w-[60px] fill-green-300 dark:fill-purple-400 hover:fill-green-400 dark:hover:fill-purple-500" />
          }
          onClick={() => navigate(-1)}
        />
        <div className="w-full">
          {icon && { icon }}
          <h1 className="text-green-300 dark:text-purple-400 text-6xl uppercase text-center w-full">
            {title}
          </h1>
        </div>
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
