import { useContext, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface AnonimousRouteProps {
  page: ReactNode
}

const AnonimousRoute: React.FC<AnonimousRouteProps> = ({ page }) => {
  const { isAuth } = useContext(UserContext)

  return <>{isAuth ? <Navigate to="/" replace /> : page}</>
}

export default AnonimousRoute
