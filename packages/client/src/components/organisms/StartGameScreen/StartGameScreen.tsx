import { Button } from '@/components/atoms'

type GameScreenProps = {
  onStartGame: () => void
  onLeaveGame: () => void
}

export default function StartGameScreen({ onStartGame, onLeaveGame }: GameScreenProps) {
  return (
    <section className="flex justify-center h-full w-full border-2 border-green-300 dark:border-pink-500 rounded-2xl p-[60px] bg-custom-game-light dark:bg-custom-game-dark bg-no-repeat bg-cover">
      <div className="flex flex-col w-auto h-full bg-right justify-center items-center">
        <div className="text-green-300 dark:text-purple-800 text-4xl uppercase text-center mb-12">
          <p className="text-6xl mb-2">Prepare</p>
          <p className="text-5xl mb-8">to solve the code matrix</p>
          <p className="mb-2">you will have 30 seconds</p>
          <p className="text-3xl mb-4">use keyboard only</p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <Button label="i'm ready, go in!" onClick={onStartGame} />
          <Button label="another time, get out" onClick={onLeaveGame} />
        </div>
        <div className="text-green-300 dark:text-purple-800 mt-16">
          Press alt + F to toogle full screen mode
        </div>
      </div>
    </section>
  )
}
