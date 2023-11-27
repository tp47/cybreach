import { MatrixConfig, MatrixDirection, MoveDirection } from './matrix.types'
import { Drawable } from '@/model/gameEngine/drawable'
import { BoardMatrix, EventBus } from '@/model'

class MatrixDrawable extends Drawable {
  private matrix: BoardMatrix
  private matrixSize: number

  private currentElementIndex = 0
  private selectedElements: number[] = []

  private isRowDirection = true

  private EventBus: EventBus

  constructor(canvas: HTMLCanvasElement, matrix: BoardMatrix, config: MatrixConfig) {
    super(canvas, config.dimensions)
    this.matrix = matrix
    this.matrixSize = Math.floor(Math.sqrt(matrix.length))

    this.EventBus = new EventBus()
  }

  public draw() {
    this.drawStrokeRect({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    })

    this.drawMatrix()
  }

  private drawMatrix() {
    this.matrix.forEach((element, index) => {
      // Each column element with padding
      const x = this.x + Math.floor(index % this.matrixSize) * 25
      // Each row from new line
      const y = this.y + Math.floor(index / this.matrixSize) * 20 + 15

      if (index === this.currentElementIndex) {
        this.drawStrokeRect({ x, y: y - 15, width: 20, height: 20 })
      }

      if (this.selectedElements.includes(index)) {
        this.drawText({ x, y }, '[]', '18px mono', 'yellow')
      } else {
        this.drawText({ x, y }, element, '18px mono', 'red')
      }
    })
  }

  public moveSelection(direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.LEFT:
        if (this.canMoveLeft()) {
          this.currentElementIndex--
        }
        break

      case MoveDirection.RIGHT:
        if (this.canMoveRight()) {
          this.currentElementIndex++
        }
        break

      case MoveDirection.DOWN:
        if (this.canMoveDown()) {
          this.currentElementIndex += this.matrixSize
        }
        break

      case MoveDirection.UP:
        if (this.canMoveUp()) {
          this.currentElementIndex -= this.matrixSize
        }
        break

      default:
        break
    }
  }

  public selectElement() {
    if (this.canSelect()) {
      this.selectedElements.push(this.currentElementIndex)
      this.isRowDirection = !this.isRowDirection
      this.EventBus.dispatch('element_selected', this.matrix[this.currentElementIndex])
    }
  }

  private canMoveLeft(): boolean {
    if (
      this.currentElementIndex === 0 ||
      this.currentElementIndex % this.matrixSize === 0 ||
      !this.isRowDirection
    ) {
      return false
    }

    return true
  }

  private canMoveRight(): boolean {
    if (
      this.currentElementIndex === this.matrix.length - 1 ||
      (this.currentElementIndex + 1) % this.matrixSize === 0 ||
      !this.isRowDirection
    ) {
      return false
    }

    return true
  }

  private canMoveDown(): boolean {
    if (
      Math.floor(this.currentElementIndex / this.matrixSize) < 0 ||
      Math.ceil((this.currentElementIndex + 1) / this.matrixSize) === this.matrixSize ||
      this.isRowDirection
    ) {
      return false
    }

    return true
  }

  private canMoveUp(): boolean {
    if (Math.floor(this.currentElementIndex / this.matrixSize) === 0 || this.isRowDirection) {
      return false
    }

    return true
  }

  private canSelect(): boolean {
    if (this.selectedElements.includes(this.currentElementIndex)) {
      return false
    }

    return true
  }
}

export default MatrixDrawable
