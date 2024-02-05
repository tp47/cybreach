import type { Response, Request } from 'express'

const leaderboardController = {
  async getAll(_: Request, response: Response) {
    response.status(200).json('Hello world')
  },
}

export { leaderboardController }
