import { createBrowserRouter } from 'react-router-dom'
import {
  CreateTopicPage,
  ForumPage,
  ForumTopic,
  GamePage,
  LeaderBoardPage,
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
    element: <ProtectedRoute page={<LeaderBoardPage />} />,
  },
  {
    path: 'forum',
    element: <ProtectedRoute page={<ForumPage />} />,
  },
  {
    path: 'forum/:id',
    element: <ProtectedRoute page={<ForumTopic />} />,
  },
  {
    path: 'create-topic',
    element: <ProtectedRoute page={<CreateTopicPage />} />,
  },
])

export default router
