import { Drawable, BoardSequences } from '@/model'
import { SequencesConfig } from './sequences.types'

class Sequences extends Drawable {
  protected sequences: BoardSequences

  constructor(canvas: HTMLCanvasElement, sequences: BoardSequences, config: SequencesConfig) {
    super(canvas, config.dimensions)

    this.sequences = sequences
  }

  public draw() {
    this.drawStrokeRect({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    })

    this.drawSequences()
  }

  private drawSequences() {
    this.sequences.forEach((sequence, index) => {
      const x = this.x + Math.floor(index / this.sequences.length)
      const y = this.y + Math.floor(index % this.sequences.length) * 20 + 15

      this.drawText({ x, y }, sequence.join(' '), '18px mono', 'red')
    })
  }
}

export default Sequences
