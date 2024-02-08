import { Button, GameLogoSVG } from '@/components'
import { useAppSelector } from '@/hooks'
import { SyntheticEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const enum BUTTON {
  GAME = 'game',
  FORUM = 'forum',
  LEADERBOARD = 'leaderboard',
  TUTORIAL = 'tutorial',
}

const ARRAY_BUTTONS: BUTTON[] = [BUTTON.GAME, BUTTON.LEADERBOARD, BUTTON.FORUM, BUTTON.TUTORIAL]

const styles = {
  main_light: `h-full
    w-full
    border-2
    border-green-300
    rounded-2xl
    p-[60px]
    bg-right
    bg-cover
    flex
    gap-[160px]
  `,
  main_dark: `h-full
  w-full
  border-2
  border-pink-500
  rounded-2xl
  p-[60px]
  bg-right
  bg-cover
  flex
  gap-[160px]
`,
  nav: 'h-full flex flex-col min-w-[420px] max-w-[420px]',
  list: 'h-full flex flex-col justify-center gap-[20px]',
  tutorial_light: 'text-xl w-full text-green-300',
  tutorial_dark: 'text-xl w-full text-pink-700',
}

type MainContentProps = {
  showTutorial: boolean
  toggleTutorial: () => void
}

export default function MainContent({ showTutorial, toggleTutorial }: MainContentProps) {
  const navigate = useNavigate()
  const darkMode = useAppSelector((state) => state.theme.darkMode)

  const onClickNav = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget

      if (name === BUTTON.TUTORIAL) {
        toggleTutorial()
      } else {
        navigate(`/${name}`)
      }
    },
    [navigate]
  )

  return (
    <main
      className={`${darkMode ? styles.main_dark : styles.main_light}${
        showTutorial ? '' : 'bg-custom-main-menu-light dark:bg-custom-main-menu-dark bg-no-repeat'
      }`}
    >
      <nav className={styles.nav}>
        <GameLogoSVG className="h-full bg-cover bg-no-repeat bg-center fill-green-400 dark:fill-pink-600" />
        <ul className={styles.list}>
          {ARRAY_BUTTONS.map((name, idx) => (
            <li key={idx}>
              <Button label={name} name={name} onClick={onClickNav} />
            </li>
          ))}
        </ul>
      </nav>
      {showTutorial && (
        <div className={darkMode ? styles.tutorial_dark : styles.tutorial_light}>
          <p className="mb-4">ВЫ ВЗЛАМЫВАЕТЕ СИСТЕМУ! :)</p>
          <p className="mb-4">
            Вам нужно за отведенное время и количество шагов выбрать нужные комбинации цифр и
            символов в матрице 5х5 в порядке, указанном в последовательности.
          </p>
          <p className="mb-4">
            Выбор начинается с верхней строчки, второй кусок кода выбирается из столбца, в котором
            находился первый кусок выбранного кода, третий – из строчки, в которой находился второй
            выбранного кода и так далее. Выбранные куски кода исчезают из матрицы. Обратный отсчет
            начнется с момента запуска раунда. Количество последовательностей, необходимых для
            победы, время и ограничение ходов меняется со сложностью игры.
          </p>
          <p>За каждый успешный взлом вы получаете 10 очков и продвигаетесь в таблице лидеров.</p>
        </div>
      )}
    </main>
  )
}
