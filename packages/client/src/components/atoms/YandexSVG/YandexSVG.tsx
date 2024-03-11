interface IProps {
  className?: string
}

export default function YandexSVG(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
      <path
        fill="#4ade80"
        d="M13 26c7.18 0 13-5.82 13-13S20.18 0 13 0 0 5.82 0 13s5.82 13 13 13z"
      ></path>
      <path
        fill="#111827"
        d="M17.15 20.28h-2.58V7.518h-1.149c-2.101 0-3.206 1.062-3.206 2.633 0 1.787.769 2.61 2.34 3.672l1.3.867-3.738 5.59H7.334l3.358-4.99c-1.932-1.374-3.011-2.728-3.011-4.987 0-2.85 1.971-4.778 5.73-4.778h3.738l.001 14.755z"
      ></path>
    </svg>
  )
}
