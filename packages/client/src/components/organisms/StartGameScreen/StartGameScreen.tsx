import { Button } from '@/components/atoms'

type GameScreenProps = {
  onStartGame: () => void
  onLeaveGame: () => void
}

export default function StartGameScreen({ onStartGame, onLeaveGame }: GameScreenProps) {
  return (
    <section className="flex flex-col h-full w-full border-2 border-green-300 rounded-2xl p-[60px] bg-right bg-contain gap-[24px] justify-center items-center">
      <div className="text-green-300 text-3xl w-[60%] uppercase text-center mb-10">
        prepare to solve the code matrix
      </div>
      <div className="w-[50%] flex flex-col gap-4">
        <Button label="i'm ready, go in!" onClick={onStartGame} />
        <Button label="another time, get out" onClick={onLeaveGame} />
      </div>
    </section>
  )
}
