import { MatrixConfig } from "./matrix.types";
import { Drawable } from "@/model/gameEngine/drawable";
import type { BoardMatrix } from "@/model";

class Matrix extends Drawable {
  private matrix: BoardMatrix;
  private matrixSize: number;

  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(
    canvas: HTMLCanvasElement,
    matrix: BoardMatrix,
    config: MatrixConfig
  ) {
    super(canvas);
    this.matrix = matrix;
    this.matrixSize = Math.floor(Math.sqrt(matrix.length));

    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
  }

  public draw() {
    this.drawStrokeRect("#d9f06e", {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    });

    this.drawMatrix();
  }

  private drawMatrix() {
    this.matrix.forEach((element, index) => {
      const x = this.x + Math.floor(index % this.matrixSize) * 20;
      const y = this.y + Math.floor(index / this.matrixSize) * 20;

      this.drawText(element, "12px serif", "red", { x, y });
    });
  }
}

export default Matrix;
