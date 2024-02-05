import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'

interface AnonimousRouteProps {
  page: JSX.Element
}

export default function AnonimousRoute({ page }: AnonimousRouteProps) {
  const { isAuth } = useAppSelector((state) => state.user)
  const urlParams = new URLSearchParams(window.location.search)
  const derivedPage = urlParams.get('page')

  return !isAuth ? page : <Navigate to={derivedPage || '/'} replace />
}
