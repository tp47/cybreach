import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface AnonimousRouteProps {
  page: JSX.Element
}

export default function AnonimousRoute({ page }: AnonimousRouteProps) {
  const { isAuth } = useContext(UserContext)

  return !isAuth ? page : <Navigate to="/" replace />
}
