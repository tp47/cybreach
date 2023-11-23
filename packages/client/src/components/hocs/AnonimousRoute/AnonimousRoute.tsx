import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '@/services/context'

interface AnonimousRouteProps {
  page: JSX.Element
}

export default function AnonimousRoute({ page }: AnonimousRouteProps) {
  const { isAuth } = useContext(UserContext)
  const urlParams = new URLSearchParams(window.location.search)
  const derivedPage = urlParams.get('page')

  return !isAuth ? page : <Navigate to={derivedPage || '/'} replace />
}
