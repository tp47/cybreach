import { Coordinates, RectDimensions, StrokeStyle } from "./drawable.types";

class Drawable {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;

  constructor(canvas: HTMLCanvasElement, config: RectDimensions) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
  }

  protected drawStrokeRect(
    strokeStyle: StrokeStyle,
    { x, y, width, height }: RectDimensions
  ) {
    this.context.strokeStyle = strokeStyle;
    this.context.strokeRect(x, y, width, height);
  }

  protected drawText(
    content: string,
    fontStyle: string,
    fillStyle: StrokeStyle,
    { x, y }: Coordinates
  ) {
    this.context.font = fontStyle;
    this.context.fillStyle = fillStyle;
    this.context.fillText(content, x, y);
  }
}

export default Drawable;
