import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface AnonimousRouteProps {
  page: JSX.Element
}

export default function AnonimousRoute({ page }: AnonimousRouteProps) {
  const navigate = useNavigate()
  const { isAuth } = useContext(UserContext)

  if (isAuth) {
    navigate('/')
  }

  return page
}
