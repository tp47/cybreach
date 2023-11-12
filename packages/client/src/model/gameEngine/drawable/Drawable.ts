import { Coordinates, RectDimensions, StrokeStyle } from "./drawable.types";

class Drawable {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
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
