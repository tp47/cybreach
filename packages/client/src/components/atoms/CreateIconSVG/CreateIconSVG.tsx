interface IProps {
  className?: string
}

export default function CreateIconSVG({ className }: IProps): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M42 28V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H20V10H10V38H38V28H42Z"
        fill="#120F18"
      />
      <path d="M42 14H34V6H30V14H22V18H30V26H34V18H42V14Z" fill="#120F18" />
    </svg>
  )
}
