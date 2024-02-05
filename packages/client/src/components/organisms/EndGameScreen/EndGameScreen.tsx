import { Button } from '@/components/atoms'
import { GameResult } from '@/model/gameEngine/game'
import { useCallback, useEffect } from 'react'
import LeaderboardApi from '@/services/api/leaderboardApi'
import { useAppSelector } from '@/hooks'
import { getScoreLocal, setScoreLocal } from '@/services/helpers/score'
import { User } from '@/types'

type EndGameScreenProps = {
  onStartGame: () => void
  onLeaveGame: () => void
  result: GameResult | undefined
}

export default function EndGameScreen({ onStartGame, onLeaveGame, result }: EndGameScreenProps) {
  const user = useAppSelector((state) => state.user.user)

  const setScoreEffect = useCallback(async ({ user }: { user: User }) => {
    const { display_name, first_name, avatar, login } = user

    const currentScore = getScoreLocal({ login })
    const newScore = currentScore + 10

    const response = await LeaderboardApi.setScore({
      value: newScore,
      playerName: display_name || first_name,
      avatar,
    })

    if (response) {
      setScoreLocal({ login, value: newScore })
    }
  }, [])

  useEffect(() => {
    if (result === GameResult.SOLVED && user) {
      setScoreEffect({ user })
    }
  }, [user, result, setScoreEffect])

  return (
    <section className="flex justify-center h-full w-full border-2 border-green-300 dark:border-pink-500 rounded-2xl p-[60px] bg-custom-game-light dark:bg-custom-game-dark bg-no-repeat bg-cover">
      <div className="flex flex-col w-auto h-full bg-right justify-center items-center">
        {result === GameResult.SOLVED && (
          <div className="text-green-300 dark:text-purple-800 text-4xl uppercase text-center mb-12">
            <p className="text-6xl mb-6">good work !</p>
            <p className="mb-2">breach succesfull !!!</p>
            <p>you won this time.</p>
          </div>
        )}
        {result === GameResult.LOSED && (
          <div className="flex flex-col text-red-700 text-4xl uppercase text-center mb-12">
            <p className="text-6xl mb-6">game over !</p>
            <p className="mb-2">breach failed !!!</p>
            <p>you losed this time...</p>
          </div>
        )}
        <div className="w-full flex flex-col gap-6">
          <Button label="try again" onClick={onStartGame} />
          <Button label="not this time" onClick={onLeaveGame} />
        </div>
        <div className="text-green-300 dark:text-purple-800 mt-16">
          Press alt + F to toogle full screen mode
        </div>
      </div>
    </section>
  )
}
