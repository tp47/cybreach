import { EndGameScreen, GameContainer, StartGameScreen, MainLayout, Header } from '@/components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type GameStage = 'startScreen' | 'inProcess' | 'endScreen'

function GamePage() {
  const [gameStage, setGameStage] = useState<GameStage>('startScreen')
  const navigate = useNavigate()

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
            <EndGameScreen onStartGame={onStartGame} onLeaveGame={onLeaveGame} />
          )}
        </>
      }
    />
  )
}

export default GamePage
