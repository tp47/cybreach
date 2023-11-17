import { AvatarSVG } from '@/components'
import { Link } from 'react-router-dom'

export default function MainHeader() {
  return (
    <header className="mb-[30px]">
      <div className="flex">
        <h1 className="text-green-300 text-6xl uppercase">code matrix</h1>
        <div className="ml-auto flex">
          <Link to="/profile" className="bg-transparent group">
            <AvatarSVG className="w-[60px] fill-green-300 group-hover:fill-green-400" />
          </Link>
        </div>
      </div>
    </header>
  )
}
