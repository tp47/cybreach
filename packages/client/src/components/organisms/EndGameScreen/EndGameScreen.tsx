import { Button } from '@/components/atoms'

type GameScreenProps = {
  onStartGame: () => void
  onLeaveGame: () => void
}

export default function EndGameScreen({ onStartGame, onLeaveGame }: GameScreenProps) {
  return (
    <section className="flex flex-col h-full w-full border-2 border-green-300 rounded-2xl p-[60px] bg-right bg-contain gap-[24px] justify-center items-center">
      <div className="text-green-300 text-3xl w-[60%] uppercase text-center mb-10">
        you solved [X] of [Y] sequences and earned [Z] points
        <br />
        try again?
      </div>
      <div className="w-[60%] flex flex-col gap-4">
        <Button label="Go next!" onClick={onStartGame} />
        <Button label="another time, get out" onClick={onLeaveGame} />
      </div>
    </section>
  )
}
