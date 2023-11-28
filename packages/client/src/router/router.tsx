import { createBrowserRouter } from 'react-router-dom'
import {
  Forum,
  ForumTopic,
  GamePage,
  LeaderBoard,
  ProfilePage,
  ErrorPage,
  MainPage,
} from '@/components'
import { AnonimousRoute, ProtectedRoute } from '@/components/hocs/'
import { LoginPage, RegisterPage } from '@/components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute page={<MainPage />} />,
    errorElement: <ErrorPage errorCode={404} />,
  },
  {
    path: 'signin',
    element: <AnonimousRoute page={<LoginPage />} />,
  },
  {
    path: 'signup',
    element: <AnonimousRoute page={<RegisterPage />} />,
  },
  {
    path: 'profile',
    element: <ProtectedRoute page={<ProfilePage />} />,
  },
  {
    path: 'game',
    element: <ProtectedRoute page={<GamePage />} />,
  },
  {
    path: 'leaderboard',
    element: <ProtectedRoute page={<LeaderBoard />} />,
  },
  {
    path: 'forum',
    element: <ProtectedRoute page={<Forum />} />,
  },
  {
    path: 'forum/:id',
    element: <ProtectedRoute page={<ForumTopic />} />,
  },
])

export default router
