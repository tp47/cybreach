import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'

interface ProtectedRouteProps {
  page: JSX.Element
}

export default function ProtectedRoute({ page }: ProtectedRouteProps) {
  const { isAuth } = useAppSelector((state) => state.user)

  return isAuth ? page : <Navigate to="/signin" replace />
}
