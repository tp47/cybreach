import { RectDimensions } from '@/model'

type MatrixConfig = {
  dimensions: RectDimensions
}

enum MoveDirection {
  LEFT,
  DOWN,
  UP,
  RIGHT,
}

enum MatrixDirection {
  ROW,
  COLUMN,
}
export { MoveDirection, MatrixDirection }
export type { MatrixConfig }
