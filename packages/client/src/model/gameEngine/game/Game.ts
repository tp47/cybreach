import { Matrix } from "@/model";
import { GameConfig } from "./game.types";

class Game {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  private seed: string;
  public level: number;

  protected matrix: Matrix;

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    if (canvas.getContext("2d") === null) {
      throw new Error("Canvas context is null");
    }
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.seed = config.seed;
    this.level = config.level;

    this.matrix = new Matrix(canvas, ["C8", "FA", "E9"], {
      x: 50,
      y: 50,
      width: 200,
      height: 200,
    });

    this.animate = this.animate.bind(this);

    this.prepareCanvas();
    requestAnimationFrame(this.animate);
  }

  private prepareCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawBackground();
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private animate() {
    this.clearCanvas();
    this.drawBackground();

    this.matrix.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  private drawBackground() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Game;
