import { createBrowserRouter } from 'react-router-dom'
import { Forum, ForumTopic, Game, LeaderBoard, Profile, ErrorPage, MainPage } from '../components'
import { ProtectedRoute } from '@/components/hocs'

import { LoginPage, RegisterPage } from '@/components'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: 'game',
    element: (
      <ProtectedRoute>
        <Game />
      </ProtectedRoute>
    ),
  },
  {
    path: 'leaderboard',
    element: (
      <ProtectedRoute>
        <LeaderBoard />
      </ProtectedRoute>
    ),
  },
  {
    path: 'forum',
    element: (
      <ProtectedRoute>
        <Forum />
      </ProtectedRoute>
    ),
  },
  {
    path: 'forum/:id',
    element: (
      <ProtectedRoute>
        <ForumTopic />
      </ProtectedRoute>
    ),
  },
])

export default router
