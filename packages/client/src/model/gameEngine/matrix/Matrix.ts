import { MatrixConfig } from "./matrix.types";
import { Drawable } from "@/model/gameEngine/drawable";
import type { BoardMatrix } from "@/model";

class Matrix extends Drawable {
  private matrix: BoardMatrix;
  private matrixSize: number;

  constructor(
    canvas: HTMLCanvasElement,
    matrix: BoardMatrix,
    config: MatrixConfig
  ) {
    super(canvas, config.dimensions);
    this.matrix = matrix;
    this.matrixSize = Math.floor(Math.sqrt(matrix.length));
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
      const x = this.x + Math.floor(index % this.matrixSize) * 25;
      const y = this.y + Math.floor(index / this.matrixSize) * 20 + 15;

      this.drawText(element, "18px mono", "red", { x, y });
    });
  }
}

export default Matrix;
