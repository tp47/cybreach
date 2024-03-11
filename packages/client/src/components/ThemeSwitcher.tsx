import { useAppDispatch, useAppSelector } from '@/hooks'
import { setDarkMode } from '@/store/theme/ThemeSlice'
import { useEffect } from 'react'
import { Button, ThemeIconSVG } from '@/components'

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.theme.darkMode)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', `${darkMode}`)
  }, [darkMode])

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!darkMode))
  }

  return (
    <Button
      onClick={toggleDarkMode}
      className={`w-[60px] mr-2 ${
        !darkMode ? 'fill-green-300 hover:fill-green-400' : 'fill-pink-500 hover:fill-pink-600'
      } transition-colors duration-200`}
      image={<ThemeIconSVG darkMode={darkMode} />}
    />
  )
}

export default ThemeSwitcher
