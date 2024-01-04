import { BASE_URL } from '@/constants/baseUrl'
import { BaseAPI } from './baseAPI'

type AllScore = {
  cursor: number
  limit: number
}

const RATING_FIELD_NAME = 'value'
const TEAM_NAME = 'cybereach'

const ScoreData = {
  ratingFieldName: RATING_FIELD_NAME,
  teamName: TEAM_NAME,
}

class Score extends BaseAPI {
  async getAll(data: AllScore) {
    return fetch(
      `${this._baseUrl}/leaderboard/all`,
      this._setBaseOptions('POST', {
        ratingFieldName: RATING_FIELD_NAME,
        ...data,
      })
    ).then((res) => this._getResponse(res))
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
        ...ScoreData,
        data: {
          avatar,
          playerName,
          value,
        },
      })
    ).then((res) => this._getResponse(res))
  }
}

const ScoreApi = new Score({ baseUrl: BASE_URL })

export default ScoreApi
