import { createBrowserRouter } from 'react-router-dom'
import {
  Forum,
  ForumTopic,
  Game,
  LeaderBoard,
  ProfilePage,
  ErrorPage,
  MainPage,
} from '../components'

import { LoginPage, RegisterPage } from '@/components'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage errorCode={404} />,
  },
  {
    path: 'signin',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <RegisterPage />,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: 'game',
    element: <Game />,
  },
  {
    path: 'leaderboard',
    element: <LeaderBoard />,
  },
  {
    path: 'forum',
    element: <Forum />,
  },
  {
    path: 'forum/:id',
    element: <ForumTopic />,
  },
])
