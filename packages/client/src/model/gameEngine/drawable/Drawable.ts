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
  ) {
    if (dashes !== undefined) {
      this.context.setLineDash([dashes])
    } else {
      this.context.setLineDash([])
    }

    this.context.strokeStyle = strokeStyle
    this.context.strokeRect(x, y, width, height)
  }

  protected drawText(
    { x, y }: Coordinates,
    content: string,
    fontStyle = '20px mono',
    fillStyle: StrokeStyle = this.styles.colors.main
  ) {
    this.context.font = fontStyle
    this.context.fillStyle = fillStyle
    this.context.fillText(content, x, y)
  }
}

export default Drawable
