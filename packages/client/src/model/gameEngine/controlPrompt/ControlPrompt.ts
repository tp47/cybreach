import { Drawable } from '@/model'
import { ControlPromptConfig } from './controlPrompt.types'

class ControlPrompt extends Drawable {
  private prompt: string

  constructor(canvas: HTMLCanvasElement, prompt: string, config: ControlPromptConfig) {
    super(canvas, config.dimensions)

    this.prompt = prompt
  }

  public draw() {
    this.drawText({ x: this.x, y: this.y }, this.prompt, this.styles.prompt.font)
  }
}

export default ControlPrompt
