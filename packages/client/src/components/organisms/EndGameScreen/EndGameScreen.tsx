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
    const { display_name, first_name, avatar } = user

    const currentScore = getScoreLocal()
    const newScore = currentScore + 10

    const response = await LeaderboardApi.setScore({
      value: newScore,
      playerName: display_name || first_name,
      avatar,
    })

    if (response) {
      setScoreLocal(newScore)
    }
  }, [])

  useEffect(() => {
    if (result === GameResult.SOLVED && user) {
      setScoreEffect({ user })
    }
  }, [user, result, setScoreEffect])

  return (
    <section className="flex flex-col h-full w-full border-2 border-green-300 rounded-2xl p-[60px] bg-right gap-[24px] justify-center items-center bg-custom-game bg-no-repeat bg-cover">
      {result === GameResult.SOLVED && (
        <div className="text-green-300 text-3xl w-[60%] uppercase text-center mb-10">
          you solved the code matrix!
        </div>
      )}
      {result === GameResult.LOSED && (
        <div className="text-red-400 text-3xl w-[60%] uppercase text-center mb-10">
          you losed this time...
        </div>
      )}
      <div className="w-[40%] flex flex-col gap-4">
        <Button label="Try again!" onClick={onStartGame} />
        <Button label="another time, get out" onClick={onLeaveGame} />
      </div>
      <div className="text-green-300">Press alt + F to toogle full screen mode</div>
    </section>
  )
}
