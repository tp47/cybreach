import { Button } from '@/components'
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
    gap-[200px]
  `,
  main_dark: `h-full
  w-full
  border-2
  border-purple-300
  rounded-2xl
  p-[60px]
  bg-right
  bg-cover
  flex
  gap-[200px]
`,
  nav: 'h-full flex flex-col min-w-[330px] max-w-[330px]',
  list: 'h-full flex flex-col justify-center gap-[20px]',
  btn_light: `
  bg-green-950
  border-2
  border-green-300
  rounded-lg
  py-[12px] px-[15px]
  w-full
  shadow-[0px_0px_4px_1px]
  shadow-green-300
  text-white
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
`,
  btn_dark: `
bg-purple-950
border-2
border-purple-300
rounded-lg
py-[12px] px-[15px]
w-full
shadow-[0px_0px_4px_1px]
shadow-purple-300
text-white
hover:bg-purple-300
hover:text-purple-950
disabled:bg-stone-500
disabled:text-stone-400
disabled:shadow-none
disabled:border-stone-500
active:bg-emerald-600
active:text-purple-300
transition-all
duration-750
uppercase
`,
  tutorial_light: 'text-xl w-full text-green-300',
  tutorial_dark: 'text-xl w-full text-purple-400',
}

export default function MainContent() {
  const navigate = useNavigate()
  const darkMode = useAppSelector((state) => state.theme.darkMode)

  const [showTutorial, setShowTutorial] = useState(false)

  const onClickNav = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget

      if (name === BUTTON.TUTORIAL) {
        setShowTutorial((prev) => !prev)
      } else {
        navigate(`/${name}`)
      }
    },
    [navigate]
  )

  return (
    <main
      className={`${darkMode ? styles.main_dark : styles.main_light}${
        showTutorial ? '' : 'bg-custom-main-menu bg-no-repeat'
      }`}
    >
      <nav className={styles.nav}>
        <h1 className="text-bold text-7xl text-green-300 dark:text-purple-400 decoration-underline">
          CYBREACH
        </h1>
        <ul className={styles.list}>
          {ARRAY_BUTTONS.map((name, idx) => (
            <li key={idx}>
              <Button
                label={name}
                name={name}
                onClick={onClickNav}
                className={darkMode ? styles.btn_dark : styles.btn_light}
              />
            </li>
          ))}
        </ul>
      </nav>
      {showTutorial && (
        <div className={darkMode ? styles.tutorial_dark : styles.tutorial_light}>
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
