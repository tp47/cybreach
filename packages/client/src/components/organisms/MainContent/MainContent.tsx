import { Button } from '@/components'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const enum BUTTON {
  GAME = 'game',
  FORUM = 'forum',
  LEADERBOARD = 'leaderboard',
  TUTORIAL = 'tutorial',
}

const classNameBtn = `
    text-white
    bg-green-950
    border-2
    border-green-300
    rounded-lg
    py-[12px] px-[15px]
    w-full
    shadow-[0px_0px_4px_1px]
    shadow-green-300
    hover:bg-green-300
    hover:text-green-950
    disabled:bg-stone-500
    disabled:text-stone-400
    disabled:shadow-none
    disabled:border-stone-500
    active:bg-emerald-600
    active:text-green-300
    transition-all
    duration-750
    uppercase
  `

export default function MainContent() {
  const navigate = useNavigate()

  const [showTutorial, setShowTutorial] = useState(false)

  const onClickNav = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget

    if (name === BUTTON.TUTORIAL) {
      setShowTutorial((prev) => !prev)
    } else {
      navigate(`/${name}`)
    }
  }

  return (
    <main
      className={`
        h-full
        border-2
        border-green-300
        rounded-2xl
        p-[60px]
        bg-right
        bg-contain
        flex
        gap-[200px]
        ${showTutorial ? '' : 'custom-bg-main-menu'}
      `}
    >
      <nav className="h-full flex flex-col min-w-[330px] max-w-[330px]">
        <ul className="h-full flex flex-col justify-center gap-[20px] ">
          <li>
            <Button
              label={BUTTON.GAME}
              name={BUTTON.GAME}
              onClick={onClickNav}
              className={classNameBtn}
            />
          </li>
          <li>
            <Button
              label={BUTTON.LEADERBOARD}
              name={BUTTON.LEADERBOARD}
              onClick={onClickNav}
              className={classNameBtn}
            />
          </li>
          <li>
            <Button
              label={BUTTON.FORUM}
              name={BUTTON.FORUM}
              onClick={onClickNav}
              className={classNameBtn}
            />
          </li>
          <li>
            <Button
              label={BUTTON.TUTORIAL}
              name={BUTTON.TUTORIAL}
              onClick={onClickNav}
              className={classNameBtn}
            />
          </li>
        </ul>
      </nav>
      {showTutorial && (
        <div className=" text-xl w-full text-green-300">
          <p className="mb-4">
            Вам нужно за отведенное время и количество шагов выбрать нужные комбинации цифр и
            символов в матрице 5х5 в порядке, указанном в последовательности.
          </p>
          <p>
            Выбор начинается с верхней строчки, второй кусок кода выбирается из столбца, в котором
            находился первый кусок выбранного кода, третий – из строчки, в которой находился второй
            выбранного кода и так далее. Выбранные куски кода исчезают из матрицы. Обратный отсчет
            начнется с момента запуска раунда. Количество последовательностей, необходимых для
            победы, время и ограничение ходов меняется со сложностью игры.
          </p>
        </div>
      )}
    </main>
  )
}
