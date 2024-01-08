export default function FullScreen(): JSX.Element {
  const styles = {
    icon: `
      h-[30px]
      w-[30px]
      bg-contain
      absolute
      top-[110px]
      right-[80px]
      cursor-pointer
    `,
  }

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  return <div className={`${styles.icon} bg-fullScreen`} onClick={handleFullScreen} />
}
