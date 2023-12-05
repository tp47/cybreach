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
      if (e.altKey && (e.key === 'ƒ' || e.key === 'f')) {
        e.stopPropagation()
        toggleFullScreen()
      }
    }

    document.addEventListener('keypress', handler)

    return () => document.removeEventListener('keypress', handler)
  }, [])
}
