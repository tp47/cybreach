import { Matrix, MatrixGenerator, Sequences, Buffer, EventBus } from "@/model";
import { MoveDirection } from "@/model";
import { GameConfig, GameStatus } from "./game.types";

class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private seed: string;
  private level: number;

  private gameStatus: GameStatus = GameStatus.IN_PROGRESS;

  private Matrix: Matrix;
  private Sequences: Sequences;
  private Buffer: Buffer;
  private MatrixGenerator: MatrixGenerator;

  private EventBus: EventBus;

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    if (canvas.getContext("2d") === null) {
      throw new Error("Canvas context is null");
    }
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.seed = config.seed;
    this.level = config.level;

    this.MatrixGenerator = new MatrixGenerator(this.level, this.seed, {
      minMatrixSize: 3,
      maxMatrixSize: 7,
      minSequencesAmount: 1,
      maxSequencesAmount: 1,
      minSequenceLength: 2,
      minBufferSize: 4,
      maxBufferSize: 6,
      matrixValues: ["A0", "E9", "4C", "8B", "6F"],
      emptyMatrixValue: " ",
    });

    this.Matrix = new Matrix(canvas, this.MatrixGenerator.matrix, {
      dimensions: {
        x: 50,
        y: 50,
        width: 200,
        height: 200,
      },
    });

    this.Buffer = new Buffer(
      canvas,
      this.MatrixGenerator.bufferSize,
      this.MatrixGenerator.sequences,
      {
        dimensions: {
          x: 300,
          y: 50,
          width: 200,
          height: 200,
        },
      }
    );

    this.Sequences = new Sequences(canvas, this.MatrixGenerator.sequences, {
      dimensions: {
        x: 550,
        y: 50,
        width: 200,
        height: 200,
      },
    });

    this.EventBus = new EventBus();

    this.animate = this.animate.bind(this);

    this.handleKeystroke = this.handleKeystroke.bind(this);
    this.endGame = this.endGame.bind(this);

    this.init();
  }

  private init() {
    this.prepareCanvas();
    this.addEvents();
    this.registerEvents();
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

    switch (this.gameStatus) {
      case GameStatus.IN_PROGRESS:
        this.Matrix.draw();
        this.Sequences.draw();
        this.Buffer.draw();
        break;

      case GameStatus.SOLVED:
        this.context.font = "24px mono";
        this.context.fillStyle = "#00ff00";
        this.context.fillText("Sequnce solved", 50, 50);
        break;

      default:
        break;
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  private drawBackground() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private handleKeystroke(event: KeyboardEvent) {
    const { key } = event;

    switch (key) {
      case "ArrowRight":
      case "l":
        this.Matrix.moveSelection(MoveDirection.RIGHT);
        break;

      case "ArrowLeft":
      case "h":
        this.Matrix.moveSelection(MoveDirection.LEFT);
        break;

      case "ArrowUp":
      case "k":
        this.Matrix.moveSelection(MoveDirection.UP);
        break;

      case "ArrowDown":
      case "j":
        this.Matrix.moveSelection(MoveDirection.DOWN);
        break;

      case "Enter":
        this.Matrix.selectElement();
        break;

      default:
        break;
    }
  }

  private addEvents() {
    window.addEventListener("keydown", this.handleKeystroke);
  }

  private removeEvents() {
    window.removeEventListener("keydown", this.handleKeystroke);
  }

  public destruct() {
    this.removeEvents();
  }

  private endGame() {
    this.gameStatus = GameStatus.SOLVED;
  }

  private registerEvents() {
    this.EventBus.register("sequence_composed", this.endGame);
  }
}

export default Game;
