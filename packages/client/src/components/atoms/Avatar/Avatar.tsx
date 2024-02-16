import { defaultAvatarPath, resourcesEndpoind } from '@/constants/avatarsPath'
import { User } from '@/types'

type AvatarProps = {
  user?: User
  sm?: true
  base?: true
  xl?: true
}

export default function Avatar({ user, sm, base, xl }: AvatarProps) {
  return (
    <img
      className={`
        ${sm && 'h-9 w-9'} ${base && 'h-12 w-12'} ${xl && 'h-16 w-16'} 
        border border-green-300 dark:border-pink-500 rounded bg-contain bg-center bg-no-repeat
      `}
      src={user.avatar ? `${resourcesEndpoind}${user!.avatar}` : defaultAvatarPath}
      alt={`${user?.name || 'player'}'s avatar`}
    />
  )
}
