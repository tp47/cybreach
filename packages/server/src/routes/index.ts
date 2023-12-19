import leaderboard from './leaderboard'
import type { Application } from 'express'

function useRoutes(app: Application) {
  app.use('/api/leaderboard', leaderboard)
}

export { useRoutes }
