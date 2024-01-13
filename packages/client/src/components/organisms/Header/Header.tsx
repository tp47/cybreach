import { AvatarSVG, BackButtonSVG } from '@/components'
import { Link } from 'react-router-dom'

export default function Header({ ...props }) {
  const { title, icon } = props

  return (
    <header className=" w-full">
      <div className="flex w-full h-[60px] my-3">
        <div className="mr-auto my-auto">
          <Link to={'/'} className="bg-transparent group">
            <BackButtonSVG className="w-[60px] fill-green-300 dark:fill-purple-400 group-hover:fill-green-400 dark:group-hover:fill-purple-500" />
          </Link>
        </div>
        <div>
          {icon && { icon }}
          <h1 className="text-green-300 dark:text-purple-400 text-6xl uppercase text-center w-full">
            {title}
          </h1>
        </div>
        <div className="ml-auto">
          <Link to="/profile" className="bg-transparent group">
            <AvatarSVG className="w-[60px] fill-green-300 dark:fill-purple-400 group-hover:fill-green-400" />
          </Link>
        </div>
      </div>
    </header>
  )
}
