import { AnonimousRoute, ProtectedRoute } from '@/components/hocs/'
import {
  Forum,
  ForumTopic,
  GamePage,
  LeaderBoard,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ErrorPage,
  MainPage,
} from '@/components'

const routes = [
  {
    path: '/',
    element: <ProtectedRoute page={<MainPage />} />,
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
  {
    path: '*',
    element: <ErrorPage errorCode={404} />,
  },
]

export default routes
