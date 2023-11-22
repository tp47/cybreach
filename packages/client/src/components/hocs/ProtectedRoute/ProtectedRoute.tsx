import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface ProtectedRouteProps {
  page: JSX.Element
}

export default function ProtectedRoute({ page }: ProtectedRouteProps) {
  const { isAuth } = useContext(UserContext)

  return <>{isAuth ? page : <Navigate to="/signin" replace />}</>
}
