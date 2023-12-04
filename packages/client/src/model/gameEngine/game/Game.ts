import {
  Matrix,
  MatrixGenerator,
  Sequences,
  Buffer,
  EventBus,
  MoveDirection,
  Timer,
  ControlPrompt,
} from '@/model'
import { Drawable } from '@/model/gameEngine/drawable'
import { GameConfig, GameResult, GameStage, GameStatus } from './game.types'

class Game extends Drawable {
  private seed: string
  private level: number

  private gameStatus: GameStatus = GameStatus.IN_PROGRESS
  private availableTime: number

  private Matrix: Matrix
  private Sequences: Sequences
  private Buffer: Buffer
  private Timer: Timer
  private ControlPrompt: ControlPrompt

  private MatrixGenerator: MatrixGenerator

  private EventBus: EventBus

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    if (canvas.getContext('2d') === null) {
      throw new Error('Canvas context is null')
    }

    super(canvas, { x: 0, y: 0, width: 1179, height: 624 })

    this.canvas = canvas
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D

    this.seed = config.seed
    this.level = config.level

    this.MatrixGenerator = new MatrixGenerator(this.level, this.seed, {
      minMatrixSize: 3,
      maxMatrixSize: 7,
      minSequencesAmount: 1,
      maxSequencesAmount: 1,
      minSequenceLength: 2,
      minBufferSize: 4,
      maxBufferSize: 6,
      matrixValues: ['A0', 'E9', '4C', '8B', '6F'],
      emptyMatrixValue: ' ',
      defaultAvailableTime: 30000,
    })

    this.availableTime = this.MatrixGenerator.computeAvailableTime()

    this.Matrix = new Matrix(canvas, this.MatrixGenerator.matrix, {
      dimensions: {
        x: 24,
        y: 95,
        width: 512,
        height: 419,
      },
    })

    this.Buffer = new Buffer(
      canvas,
      this.MatrixGenerator.bufferSize,
      this.MatrixGenerator.sequences,
      {
        dimensions: {
          x: 552,
          y: 95,
          width: 600,
          height: 65,
        },
      }
    )

    this.Sequences = new Sequences(canvas, this.MatrixGenerator.sequences, {
      dimensions: {
        x: 552,
        y: 216,
        width: 600,
        height: 156,
      },
    })

    this.Timer = new Timer(canvas, this.availableTime, {
      dimensions: {
        x: 24,
        y: 24,
        width: 412,
        height: 55,
      },
    })

    this.ControlPrompt = new ControlPrompt(
      canvas,
      [
        'Use arrow keys or <H>, <J>, <K>, <L> to move selection',
        '<Enter> or <Space> to select element',
        '<F> for fullscreen, <Esc> to quit',
      ],
      {
        dimensions: {
          x: 24,
          y: 600,
          width: 1148,
          height: 42,
        },
      }
    )

    this.EventBus = new EventBus()

    this.animate = this.animate.bind(this)
    this.handleKeystroke = this.handleKeystroke.bind(this)
    this.endGame = this.endGame.bind(this)
    this.loseGame = this.loseGame.bind(this)

    this.init()
  }

  private init(): void {
    this.prepareCanvas()
    this.addEvents()
    this.registerEvents()
    requestAnimationFrame(this.animate)
  }

  private prepareCanvas(): void {
    this.canvas.width = 1179
    this.canvas.height = 720
    this.drawBackground()
  }

  private clearCanvas(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private animate(): void {
    this.clearCanvas()
    this.drawBackground()

    switch (this.gameStatus) {
      case GameStatus.IN_PROGRESS:
        this.Matrix.draw()
        this.Sequences.draw()
        this.Buffer.draw()
        this.Timer.draw()
        this.ControlPrompt.draw()
        break

      case GameStatus.SOLVED:
        break

      case GameStatus.LOSED:
        break

      default:
        break
    }
    requestAnimationFrame(this.animate)
  }

  private drawBackground(): void {
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private handleKeystroke(event: KeyboardEvent): void {
    const { key } = event

    switch (key) {
      case 'ArrowRight':
      case 'l':
        this.Matrix.moveSelection(MoveDirection.RIGHT)
        break

      case 'ArrowLeft':
      case 'h':
        this.Matrix.moveSelection(MoveDirection.LEFT)
        break

      case 'ArrowUp':
      case 'k':
        this.Matrix.moveSelection(MoveDirection.UP)
        break

      case 'ArrowDown':
      case 'j':
        this.Matrix.moveSelection(MoveDirection.DOWN)
        break

      case 'Enter':
      case 'Space':
      case ' ':
        this.Matrix.selectElement()
        break

      default:
        break
    }
  }

  private addEvents(): void {
    window.addEventListener('keydown', this.handleKeystroke)
  }

  private removeEvents(): void {
    window.removeEventListener('keydown', this.handleKeystroke)
  }

  public destruct(): void {
    this.removeEvents()
    this.unregisterEvents()
    this.Buffer.destruct()
    this.Buffer = null
    this.Timer = null
    this.Matrix = null
    this.Sequences = null
  }

  private endGame(): void {
    this.gameStatus = GameStatus.SOLVED
    this.EventBus.dispatch('end_game', GameResult.SOLVED)
  }

  private loseGame(): void {
    this.gameStatus = GameStatus.LOSED
    this.EventBus.dispatch('end_game', GameResult.LOSED)
  }

  private registerEvents(): void {
    this.EventBus.register('sequence_composed', this.endGame)
    this.EventBus.register('buffer_overloaded', this.loseGame)
    this.EventBus.register('timer_elapsed', this.loseGame)
  }

  private unregisterEvents(): void {
    this.EventBus.unregister('sequence_composed', this.endGame)
    this.EventBus.unregister('buffer_overloaded', this.loseGame)
    this.EventBus.unregister('timer_elapsed', this.loseGame)
  }
}

export default Game
