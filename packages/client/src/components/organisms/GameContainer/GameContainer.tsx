import { Game } from '@/model'
import { useEffect, useRef } from 'react'

function GameContainer() {
  const canvasRef = useRef(null)
  const canvasId = 'gameCanvas'

  useEffect(() => {
    if (canvasRef.current === null) {
      return
    }

    let game: Game | null = new Game(canvasRef.current, {
      seed: Math.random().toString(),
      level: 1,
    })

    return () => {
      game?.destruct()
      game = null
    }
  }, [])

  return (
    <section className="flex flex-col h-full w-full border-2 overflow-hidden border-green-300 rounded-2xl p-[60px] justify-center items-center bg-black">
      <div className="bg-black min-h-[48px] w-full"></div>
      <canvas id={canvasId} ref={canvasRef}></canvas>
    </section>
  )
}

export default GameContainer
