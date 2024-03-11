import { MatrixConfig, MoveDirection } from './matrix.types'
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
    this.drawRoundedRect(
      {
        x: this.x,
        y: this.y + this.styles.title.height,
        width: this.width,
        height: this.height,
      },
      this.styles.container.radiuses,
      this.styles.container.fill
    )

    this.drawTitle('Code matrix')
    this.drawMatrix()
  }

  private drawMatrix() {
    const { elementWidth, elementHeight, elementFont, selectedElementColor } = this.styles.matrix

    if (this.isRowDirection) {
      const x = this.x + elementWidth
      const y =
        this.y +
        Math.floor(this.currentElementIndex / this.matrixSize) * elementHeight +
        20 +
        this.styles.title.height
      this.drawFilledRect(
        {
          x,
          y,
          width: elementWidth * this.matrixSize,
          height: elementHeight,
        },
        this.styles.matrix.selectedGroupColor
      )
    } else {
      const x =
        this.x +
        Math.floor(this.currentElementIndex % this.matrixSize) * elementWidth +
        elementWidth
      const y = this.y + this.styles.title.height + 20
      this.drawFilledRect(
        { x, y, width: elementWidth, height: elementHeight * this.matrixSize },
        this.styles.matrix.selectedGroupColor
      )
    }

    this.matrix.forEach((element, index) => {
      // Each column element with padding
      const x = this.x + Math.floor(index % this.matrixSize) * elementWidth + 55
      // Each row from new line
      const y =
        this.y + Math.floor(index / this.matrixSize) * elementHeight + 55 + this.styles.title.height

      if (index === this.currentElementIndex) {
        this.drawFilledRect({
          x: x - 5,
          y: y - 35,
          width: elementWidth,
          height: elementHeight,
        })
        if (this.selectedElements.includes(index)) {
          this.drawText({ x, y }, '[X]', elementFont, selectedElementColor)
        } else {
          this.drawText({ x, y }, element, elementFont, selectedElementColor)
        }
      } else {
        if (this.selectedElements.includes(index)) {
          this.drawText({ x, y }, '[X]', elementFont)
        } else {
          this.drawText({ x, y }, element, elementFont, this.styles.colors.main)
        }
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
