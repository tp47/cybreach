import { AvatarSVG } from '@/components'
import { Link } from 'react-router-dom'

export default function MainHeader() {
  return (
    <header className="mb-[30px] w-full">
      <div className="flex w-full">
        <div className="flex text-green-300 text-6xl uppercase ">code matrix</div>
        <div className="ml-auto">
          <Link to="/profile" className="bg-transparent group">
            <AvatarSVG className="w-[60px] fill-green-300 group-hover:fill-green-400" />
          </Link>
        </div>
      </div>
    </header>
  )
}
