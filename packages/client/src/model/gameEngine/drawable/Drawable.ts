import { Coordinates, RectDimensions, StrokeStyle } from './drawable.types'

class Drawable {
  protected canvas: HTMLCanvasElement
  protected context: CanvasRenderingContext2D

  protected x: number
  protected y: number
  protected width: number
  protected height: number

  protected styles = {
    colors: {
      main: '#66cc9a',
    },

    fonts: {
      main: {
        family: 'mono',
        size: '24px',
      },
    },

    title: {
      radiuses: [8, 8, 0, 0],
      height: 40,
      indention: [15, 28],
      color: '#000000',
    },

    matrix: {
      elementFont: '30px mono',
      elementWidth: 50,
      elementHeight: 50,
      selectedElementColor: '#000000',
      selectedGroupColor: '#1a372e',
    },

    container: {
      radiuses: [0, 0, 8, 8],
      fill: '#000000',
    },

    buffer: {
      elementWidth: 40,
      elementHeight: 40,
      fontStyle: '28px mono',
    },

    timer: {
      radiuses: [12, 12, 12, 12],
    },

    prompt: {
      font: '18px mono',
    },
  }

  constructor(canvas: HTMLCanvasElement, config: RectDimensions) {
    this.canvas = canvas
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D

    this.x = config.x
    this.y = config.y
    this.width = config.width
    this.height = config.height
  }

  protected drawStrokeRect(
    { x, y, width, height }: RectDimensions,
    strokeStyle: StrokeStyle = this.styles.colors.main,
    dashes?: number
  ): void {
    if (dashes !== undefined) {
      this.context.setLineDash([dashes])
    } else {
      this.context.setLineDash([])
    }

    this.context.strokeStyle = strokeStyle
    this.context.strokeRect(x, y, width, height)
    this.context.setLineDash([])
  }

  protected drawFilledRect(
    { x, y, width, height }: RectDimensions,
    fillStyle: StrokeStyle = this.styles.colors.main
  ): void {
    this.context.fillStyle = fillStyle
    this.context.fillRect(x, y, width, height)
  }

  protected drawText(
    { x, y }: Coordinates,
    content: string,
    fontStyle = `${this.styles.fonts.main.size} ${this.styles.fonts.main.family}`,
    fillStyle: StrokeStyle = this.styles.colors.main
  ): void {
    this.context.font = fontStyle
    this.context.fillStyle = fillStyle
    this.context.fillText(content, x, y)
  }

  protected drawTitle(title: string): void {
    this.drawRoundedRect(
      {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.styles.title.height,
      },
      this.styles.title.radiuses
    )
    this.drawText(
      { x: this.x + this.styles.title.indention[0], y: this.y + this.styles.title.indention[1] },
      title.toUpperCase(),
      undefined,
      this.styles.title.color
    )
  }

  protected drawRoundedRect(
    { x, y, width, height }: RectDimensions,
    radiuses: number[],
    fillColor: string = this.styles.colors.main,
    strokeColor: string = this.styles.colors.main
  ): void {
    this.context.beginPath()
    this.context.moveTo(x + radiuses[0], y)
    this.context.arcTo(x + width, y, x + width, y + height, radiuses[1])
    this.context.arcTo(x + width, y + height, x, y + height, radiuses[2])
    this.context.arcTo(x, y + height, x, y, radiuses[3])
    this.context.arcTo(x, y, x + width, y, radiuses[0])
    this.context.closePath()
    this.context.fillStyle = fillColor
    this.context.fill()
    this.context.strokeStyle = strokeColor
    this.context.stroke()
  }
}

export default Drawable
