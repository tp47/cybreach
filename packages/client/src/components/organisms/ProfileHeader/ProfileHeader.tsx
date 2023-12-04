import { useNavigate } from 'react-router-dom'

export default function ProfileHeader(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="flex items-center w-[1000px] justify-between">
      <div className="bg-back w-[72px] h-[72px] cursor-pointer" onClick={() => navigate('/')} />

      <div className="mr-[40%] flex gap-5">
        <div className="bg-profileIcon w-[48px] h-[48px]" />
        <div className="text-5xl text-emerald-500">Profile</div>
      </div>
    </div>
  )
}
