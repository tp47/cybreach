type GameConfig = {
  seed: string;
  level: number;
};

enum GameStatus {
  IN_PROGRESS,
  SOLVED,
}

export type { GameConfig };
export { GameStatus };
