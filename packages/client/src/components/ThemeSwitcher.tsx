import { useAppDispatch, useAppSelector } from '@/hooks'
import { setDarkMode } from '@/store/theme/themeSlice'
import { useEffect } from 'react'

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
    <button
      onClick={toggleDarkMode}
      className={`px-5 rounded-full mr-5  ${!darkMode ? 'bg-green-300' : 'bg-purple-400'} ${
        !darkMode ? 'text-gray-900' : 'text-white'
      } transition-colors duration-200`}
    >
      {darkMode ? 'Light' : 'Dark'}
    </button>
  )
}

export default ThemeSwitcher
