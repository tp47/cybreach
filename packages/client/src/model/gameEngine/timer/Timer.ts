import { Drawable, EventBus } from '@/model'
import { TimerConfig } from './timer.types'

class Timer extends Drawable {
  private availableTime: number
  private endTime = 0

  private EventBus: EventBus

  constructor(canvas: HTMLCanvasElement, availableTime: number, config: TimerConfig) {
    super(canvas, config.dimensions)

    this.EventBus = new EventBus()

    this.availableTime = availableTime
    this.startTimer()
  }

  public startTimer(): void {
    this.endTime = performance.now() + this.availableTime
  }

  public draw(): void {
    this.drawRoundedRect(
      {
        x: this.x + 330,
        y: this.y + 2,
        width: 145,
        height: this.height,
      },
      this.styles.timer.radiuses,
      this.styles.container.fill
    )

    this.drawText({ x: this.x, y: this.y + this.height / 1.5 }, 'Breach time remaining:')

    this.drawTimer()
  }

  private drawTimer(): void {
    const time = (this.calculateRemainingTime() / 1000).toString()

    this.drawText({ x: this.x + 360, y: this.y + this.height / 1.5 + 1 }, time)
  }

  private calculateRemainingTime(): number {
    const remainingTime = this.endTime - performance.now()

    if (remainingTime <= 0) {
      this.EventBus.dispatch('timer_elapsed')
    }

    return remainingTime
  }
}

export default Timer
