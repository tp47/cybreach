import { EndGameScreen, GameContainer, StartGameScreen, MainLayout, Header } from '@/components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventBus } from '@/model'
import { GameStage, GameResult } from '@/model/gameEngine/game/'

function GamePage() {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.STARTING)
  const [gameResult, setGameResult] = useState<GameResult>()
  const navigate = useNavigate()

  useEffect(() => {
    const eventBus = new EventBus()
    const handleGameEnd = (result: GameResult) => {
      setGameStage(GameStage.FINISHED)
      setGameResult(result)
    }

    eventBus.register('end_game', handleGameEnd)

    return () => {
      eventBus.unregister('end_game', handleGameEnd)
    }
  }, [])

  const onStartGame = () => {
    setGameStage(GameStage.RUNNING)
  }

  const onLeaveGame = () => {
    navigate('/')
  }

  return (
    <MainLayout
      header={<Header title="game" />}
      content={
        <>
          {gameStage === GameStage.STARTING && (
            <StartGameScreen onStartGame={onStartGame} onLeaveGame={onLeaveGame} />
          )}
          {gameStage === GameStage.RUNNING && <GameContainer />}
          {gameStage === GameStage.FINISHED && (
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
