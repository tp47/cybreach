import { useContext, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface ProtectedRouteProps {
  page: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ page }) => {
  const { currentUser } = useContext(UserContext)
  const isAuth = currentUser && Object.entries(currentUser).length !== 0

  return <>{isAuth ? page : <Navigate to="/signin" replace />}</>
}

export default ProtectedRoute
