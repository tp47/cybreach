import { EventBus, BoardSequences } from '@/model'
import { Drawable } from '../drawable'
import { BufferConfig } from './buffer.types'

class Buffer extends Drawable {
  private bufferLength: number
  private buffer: string[] = []
  private sequences: BoardSequences

  private EventBus: EventBus

  constructor(
    canvas: HTMLCanvasElement,
    bufferLength: number,
    sequences: BoardSequences,
    config: BufferConfig
  ) {
    super(canvas, config.dimensions)
    this.bufferLength = bufferLength
    this.sequences = sequences

    this.EventBus = new EventBus()

    this.addElement = this.addElement.bind(this)

    this.init()
  }

  private init() {
    this.registerEvents()
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

    this.drawTitle('Buffer')

    this.drawBuffer()
  }

  private drawBuffer() {
    for (let i = 0; i < this.bufferLength; i++) {
      const element = this.buffer[i]
      let dashes: number | undefined = 2

      if (element !== undefined) {
        this.drawText(
          {
            x: this.x + i * this.styles.matrix.elementWidth + 2 + this.styles.title.indention[0],
            y: this.y + this.styles.title.height + this.styles.buffer.elementHeight,
          },
          element,
          this.styles.buffer.fontStyle
        )
        dashes = undefined
      }

      this.drawStrokeRect(
        {
          x: this.x + i * this.styles.matrix.elementWidth + this.styles.title.indention[0],
          y: this.y + this.styles.title.height + 10,
          width: this.styles.buffer.elementWidth,
          height: this.styles.buffer.elementHeight,
        },
        undefined,
        dashes
      )
    }
  }

  private addElement(element: string) {
    if (this.buffer.length >= this.bufferLength) {
      return
    }

    this.buffer.push(element)

    for (const sequence of this.sequences) {
      if (this.buffer.join('').includes(sequence.join(''))) {
        this.EventBus.dispatch('sequence_composed', sequence)
        return
      }
    }

    if (this.buffer.length === this.bufferLength) {
      this.EventBus.dispatch('buffer_overloaded')
    }
  }

  private registerEvents() {
    this.EventBus.register('element_selected', this.addElement)
  }
}

export default Buffer
