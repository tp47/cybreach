export type SCORE_DATA = {
  value: number
  playerName: string
  avatar?: string
}

export type LEADERBOARD_DATA = Array<{
  data: SCORE_DATA
}>
