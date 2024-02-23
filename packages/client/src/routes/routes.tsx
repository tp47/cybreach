import { AnonimousRoute, ProtectedRoute } from '@/components/hocs/'
import {
  ForumPage,
  TopicPage,
  GamePage,
  LeaderBoardPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ErrorPage,
  MainPage,
  CreateTopicPage,
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
    element: <ProtectedRoute page={<LeaderBoardPage />} />,
  },
  {
    path: 'forum',
    element: <ProtectedRoute page={<ForumPage />} />,
  },
  {
    path: 'forum/:id',
    element: <ProtectedRoute page={<TopicPage />} />,
  },
  {
    path: 'create-topic',
    element: <ProtectedRoute page={<CreateTopicPage />} />,
  },
  {
    path: '*',
    element: <ErrorPage errorCode={404} />,
  },
]

export default routes
