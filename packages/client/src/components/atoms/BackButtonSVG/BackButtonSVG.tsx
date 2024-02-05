interface IProps {
  className?: string
}

export default function BackButtonSVG({ className }: IProps): JSX.Element {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="66"
      height="44"
      viewBox="0 0 66 44"
      fill="none"
    >
      <path d="M65.4001 14.6998V36.2998C65.4001 40.2706 62.1745 43.4998 58.2001 43.4998H7.8001V32.6998H54.6001V18.2998H15.0001V25.4998L0.600098 12.8998L15.0001 0.299805V7.4998H58.2001C60.1097 7.4998 61.941 8.25837 63.2913 9.60863C64.6415 10.9589 65.4001 12.7902 65.4001 14.6998Z" />
    </svg>
  )
}
