import { Drawable } from '@/model'
import { TimerConfig } from './timer.types'

class Timer extends Drawable {
  private availableTime: number
  private endTime = 0

  constructor(canvas: HTMLCanvasElement, availableTime: number, config: TimerConfig) {
    super(canvas, config.dimensions)

    this.availableTime = availableTime
    this.startTimer()
  }

  public startTimer() {
    this.endTime = performance.now() + this.availableTime
  }

  public draw() {
    this.drawStrokeRect({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    })

    this.drawTimer()
  }

  private drawTimer() {
    const time = (this.calculateRemainingTime() / 1000).toString()

    this.drawText({ x: this.x + 50, y: this.y + 50 }, time)
  }

  private calculateRemainingTime() {
    const remainingTime = this.endTime - performance.now()
    return remainingTime
  }
}

export default Timer
