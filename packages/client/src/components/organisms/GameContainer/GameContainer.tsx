import { Game } from '@/model'
import { useEffect, useRef } from 'react'

function GameContainer() {
  const canvasRef = useRef(null)
  const canvasId = 'gameCanvas'

  useEffect(() => {
    if (canvasRef.current === null) {
      return
    }

    const game = new Game(canvasRef.current, { seed: Math.random().toString(), level: 1 })

    return () => {
      game.destruct()
    }
  }, [])

  return <canvas id={canvasId} ref={canvasRef}></canvas>
}

export default GameContainer
