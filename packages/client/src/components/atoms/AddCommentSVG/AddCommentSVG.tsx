interface IProps {
  className?: string
}

export default function AddCommentSVG({ className }: IProps): JSX.Element {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M18.3536 17.6464L18.2071 17.5H18H4C3.60218 17.5 3.22064 17.342 2.93934 17.0607C2.65804 16.7794 2.5 16.3978 2.5 16V4C2.5 3.60218 2.65804 3.22064 2.93934 2.93934C3.22064 2.65804 3.60218 2.5 4 2.5H20C20.3978 2.5 20.7794 2.65804 21.0607 2.93934C21.342 3.22064 21.5 3.60218 21.5 4V20.7929L18.3536 17.6464Z"
        stroke="#66CC9A"
      />
    </svg>
  )
}
