type GameConfig = {
  seed: string
  level: number
}

enum GameStatus {
  IN_PROGRESS,
  SOLVED,
  LOSED,
}

export type { GameConfig }
export { GameStatus }
