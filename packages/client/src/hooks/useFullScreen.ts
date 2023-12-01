import { useEffect } from 'react'

export const useFullScreen = () => {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'Enter') {
        e.stopPropagation()
        toggleFullScreen()
      }
    }

    document.addEventListener('keypress', handler)

    return () => document.removeEventListener('keypress', handler)
  }, [])
}
