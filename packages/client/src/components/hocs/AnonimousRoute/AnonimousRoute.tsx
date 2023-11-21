import { useContext, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface AnonimousRouteProps {
  page: ReactNode
}

const AnonimousRoute: React.FC<AnonimousRouteProps> = ({ page }) => {
  const { currentUser } = useContext(UserContext)
  const isAuth = currentUser && Object.entries(currentUser).length !== 0

  return (
    <>
      {!isAuth && page}
      {isAuth && <Navigate to="/" replace />}
    </>
  )
}

export default AnonimousRoute
