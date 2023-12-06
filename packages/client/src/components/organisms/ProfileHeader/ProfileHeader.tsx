import { useNavigate } from 'react-router-dom'

export default function ProfileHeader(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="flex items-center w-full h-[60px] my-3 justify-between">
      <div className="bg-back w-[72px] h-[72px] cursor-pointer" onClick={() => navigate('/')} />

      <div className="mr-[40%] flex gap-5">
        <div className="bg-profileIcon w-[60px] h-[60px] bg-cover bg-no-repeat" />
        <div className="text-6xl text-bold text-green-300 uppercase">Profile</div>
      </div>
    </div>
  )
}
