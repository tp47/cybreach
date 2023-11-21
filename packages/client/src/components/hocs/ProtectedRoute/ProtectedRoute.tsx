import { useContext, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface ProtectedRouteProps {
  page: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ page }) => {
  const { isAuth } = useContext(UserContext)

  return <>{isAuth ? page : <Navigate to="/signin" replace />}</>
}

export default ProtectedRoute
