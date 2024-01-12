import leaderboard from './leaderboard'
import forum from './forum'
import type { Application } from 'express'

function useRoutes(app: Application) {
  app.use('/api/leaderboard', leaderboard)
  app.use('/api/forum', forum)
}

export { useRoutes }
