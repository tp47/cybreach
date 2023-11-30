import { EndGameScreen, GameContainer, StartGameScreen, MainLayout, Header } from '@/components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventBus } from '@/model'

type GameStage = 'startScreen' | 'inProcess' | 'endScreen'
type GameResult = 'solved' | 'losed' | null

function GamePage() {
  const [gameStage, setGameStage] = useState<GameStage>('startScreen')
  const [gameResult, setGameResult] = useState<GameResult>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const eventBus = new EventBus()
    const handleGameEnd = (result: GameResult) => {
      setGameStage('endScreen')
      setGameResult(result)
    }

    eventBus.register('gameEnd', handleGameEnd)

    return () => {
      eventBus.unregister('gameEnd', handleGameEnd)
    }
  }, [])

  const onStartGame = () => {
    setGameStage('inProcess')
  }

  const onLeaveGame = () => {
    navigate('/')
  }

  return (
    <MainLayout
      header={<Header title="game" />}
      content={
        <>
          {gameStage === 'startScreen' && (
            <StartGameScreen onStartGame={onStartGame} onLeaveGame={onLeaveGame} />
          )}
          {gameStage === 'inProcess' && <GameContainer />}
          {gameStage === 'endScreen' && (
            <EndGameScreen
              onStartGame={onStartGame}
              onLeaveGame={onLeaveGame}
              result={gameResult}
            />
          )}
        </>
      }
    />
  )
}

export default GamePage
