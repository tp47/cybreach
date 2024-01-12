import { Drawable } from '../drawable'
import { ControlPromptConfig } from './controlPrompt.types'

class ControlPrompt extends Drawable {
  private clue: string[]

  constructor(canvas: HTMLCanvasElement, clue: string[], config: ControlPromptConfig) {
    super(canvas, config.dimensions)

    this.clue = clue
  }

  public draw() {
    this.clue.forEach((line, index) => {
      this.drawText({ x: this.x, y: this.y + index * 25 }, line, this.styles.prompt.font)
    })
  }
}

export default ControlPrompt
