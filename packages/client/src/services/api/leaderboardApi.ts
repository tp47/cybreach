import { BASE_URL } from '@/constants/baseUrl'
import { BaseAPI } from './baseAPI'
import { LEADERBOARD_DATA } from '@/types/leaderboard'

export type AllScoreArguments = {
  cursor: number
  limit: number
}

const RATING_FIELD_NAME = 'value'
const TEAM_NAME = 'cybereach'

const LeaderboardData = {
  ratingFieldName: RATING_FIELD_NAME,
  teamName: TEAM_NAME,
}

class Leaderboard extends BaseAPI {
  async getAll(data: AllScoreArguments) {
    return fetch(
      `${this._baseUrl}/leaderboard/${TEAM_NAME}`,
      this._setBaseOptions('POST', {
        ratingFieldName: RATING_FIELD_NAME,
        ...data,
      })
    ).then((res) => this._getResponse<LEADERBOARD_DATA>(res))
  }

  async setScore({
    value,
    playerName,
    avatar,
  }: {
    value: number
    playerName: string
    avatar?: string
  }) {
    return fetch(
      `${this._baseUrl}/leaderboard`,
      this._setBaseOptions('POST', {
        ...LeaderboardData,
        data: {
          avatar,
          playerName,
          value,
        },
      })
    ).then((res) => this._getResponse(res))
  }
}

const LeaderboardApi = new Leaderboard({ baseUrl: BASE_URL })

export default LeaderboardApi
