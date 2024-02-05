import { Sizes } from '@/model'

type GameConfig = {
  seed: string
  level: number
  sizes?: Sizes
}

enum GameStatus {
  IN_PROGRESS,
  SOLVED,
  LOSED,
}

enum GameStage {
  STARTING,
  RUNNING,
  FINISHED,
}

enum GameResult {
  SOLVED,
  LOSED,
}

export type { GameConfig }
export { GameStatus, GameStage, GameResult }
