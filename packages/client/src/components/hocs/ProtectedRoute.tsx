import { useContext, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useContext(UserContext)

  if (currentUser && Object.keys(currentUser).length !== 0) {
    return <>{children}</>
  } else {
    return <Navigate to="/signin" replace />
  }
}

export default ProtectedRoute
