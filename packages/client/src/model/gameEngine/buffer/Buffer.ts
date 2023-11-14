import { Drawable, RectDimensions } from "../drawable";

class Buffer extends Drawable {
  private bufferLength: number;

  constructor(
    canvas: HTMLCanvasElement,
    bufferLength: number,
    config: RectDimensions
  ) {
    super(canvas, config);
    this.bufferLength = bufferLength;
  }
}
