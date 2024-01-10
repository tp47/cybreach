import { BoardSequences } from '@/model'
import { Drawable } from '../drawable'
import { SequencesConfig } from './sequences.types'

class Sequences extends Drawable {
  protected sequences: BoardSequences

  constructor(canvas: HTMLCanvasElement, sequences: BoardSequences, config: SequencesConfig) {
    super(canvas, config.dimensions)

    this.sequences = sequences
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

    this.drawTitle('Required sequences')

    this.drawSequences()
  }

  private drawSequences() {
    this.sequences.forEach((sequence, index) => {
      const x = this.x + Math.floor(index / this.sequences.length) + this.styles.title.indention[0]
      const y =
        this.y +
        Math.floor(index % this.sequences.length) +
        this.styles.title.height +
        this.styles.matrix.elementHeight / 2 +
        10

      this.drawText(
        { x, y },
        sequence.join(' '),
        this.styles.matrix.elementFont,
        this.styles.colors.main
      )
    })
  }
}

export default Sequences
