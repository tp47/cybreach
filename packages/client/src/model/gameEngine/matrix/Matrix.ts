import { MatrixConfig, Sequence } from "./matrix.types";

class Matrix {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  protected sequence: Sequence;

  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;

  constructor(
    canvas: HTMLCanvasElement,
    sequence: Sequence,
    config: MatrixConfig
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.sequence = sequence;

    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
  }

  public draw() {
    this.context.strokeStyle = "#d9f06e";
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export default Matrix;
