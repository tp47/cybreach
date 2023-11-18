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
    this.drawStrokeRect('#d9f06e', {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    })

    this.drawBuffer()
  }

  private drawBuffer() {
    for (let i = 0; i < this.bufferLength; i++) {
      this.drawStrokeRect(
        '#d9f06e',
        {
          x: this.x + i * 25,
          y: this.y,
          width: 20,
          height: 20,
        },
        2
      )
    }

    this.buffer.forEach((element, index) => {
      this.drawText(element, '18px mono', '#00ff00', {
        x: this.x + index * 25,
        y: this.y + 15,
      })
    })
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
      console.log('overl')
    }
  }

  private registerEvents() {
    this.EventBus.register('element_selected', this.addElement)
  }
}

export default Buffer
